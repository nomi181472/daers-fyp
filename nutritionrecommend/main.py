import pymongo
import datetime
import random
import asyncio
from nats.aio.client import Client as NATS
from stan.aio.client import Client as STAN
import json
from bson.objectid import ObjectId
async def run(loop):
    # Use borrowed connection for NATS then mount NATS Streaming
    # client on top.
    nc = NATS()
    sc = STAN()
    await nc.connect(io_loop=loop)
    await sc.connect("daers", "Diet-recommend-srv", nats=nc)
    subject = "generate:dietschedule"
    async def cb(msg):
        nonlocal sc
        print("Subject:" + subject + "Received a message (seq={}): {}".format(msg.seq, msg.data))
        try:
            my_json = msg.data.decode('utf8').replace("'", '"')
            data = json.loads(my_json)
            conn = pymongo.MongoClient("localhost", 27016)
            userId = data["userId"]
            make_shedule(30,userId, conn)
            print("Done")
        except Exception as e:
            print(e)
   # await sc.subscribe(subject, manual_acks=True, queue="", cb=cb)
    await sc.subscribe(subject, durable_name="durable", queue="diet-recommend-srv",cb=cb)
class TDEE:
    def __init__(self,age,height,weight):
        self.age=age
        self.height=height
        self.weight=weight
        # self.activity_levels_dict = {
        #     "Little_Or_No_Exercise": 1.2,
        #     "Light_Exercise": 1.375,
        #     "Moderate_Exercise": 1.55,
        #     "Very_Active": 1.725,
        #     "Extra_Active": 1.9
        # }
       # 1.5, 1.6, 1.8, 2, 2.1
        self.activity_levels_dict = {
            1.5: 1.5,
            1.6: 1.6,
            1.8: 1.8,
            2: 2.1,
            2:2

        }
    def get_bmr(self):
        bmr=66.47 + (13.75 * self.weight ) + (5.003 * self.height) - (6.755 * self.age )
        return bmr
    def getTDEE(self,activity): #total energly ependiture
        return self.activity_levels_dict[activity]* self.get_bmr()

class UserProfile:
    def __init__(self,age,height,currentWeight,targetWeight,activity):

        self.currentTdee=TDEE(age,height,currentWeight).getTDEE(activity)
        self.targetTdee=TDEE(age,height,targetWeight).getTDEE(activity)
        self.total_difference=self.targetTdee-self.currentTdee
def nutrition(nutritionName,protein,calories,fats,grams,carbohydrates,description,photos):
    return { "nutritionName":nutritionName,
             "calories":calories,
             "fats":fats,
             "protein":protein,
             "grams":grams,
             "carbohydrates":carbohydrates,
             "description":[description],
             "photos":photos
             }
def calorieCounter(protein,carbohydrate,fats):
    return (4*(protein+carbohydrate))+(9*fats)
def balanceMacroNutrients(protein,carbohydrate,fats,ratio_sub,percentage):
    is_neg=1
    if(ratio_sub<0):
        is_neg=-1
    gram=100-100*(percentage)
    protein=protein+(is_neg*(4+ratio_sub)/17)
    carbohydrate=carbohydrate+(is_neg*(4+ratio_sub)/17)
    fats=fats+(is_neg*(9+ratio_sub)/17)
    return protein,carbohydrate,fats,gram
def make_shedule(n,userId,conn):
    userdata=conn["schedulenf"]["usernutritionschedules"]

    result=userdata.find_one({"_id": ObjectId(userId)})
    age=0

    height=0
    currentWeight=0
    targetWeight=0
    activityLevel=0
    if(result!= None):
        age=result["age"]
        currentWeight=result["weight"]
        height=result["height"]
        userinformation= dict(result["userInformation"])
        targetWeight = userinformation["targetGoal"]
        activityLevel = userinformation["activityLevel"]
    else:
        print('not done')
        return

    up = UserProfile(age,height,currentWeight,targetWeight,activityLevel) # will have to add 10 kg threshold
    ratio=up.total_difference/n
    time_in_day = ["breakfast", "lunch", "dinner"]
    nutriton_collection = conn["schedulenf"]["nutritionfacts"]
    result=[]
    if(ratio<0):
        result=nutriton_collection.find().sort("protein",pymongo.DESCENDING)

    else:
        result =nutriton_collection.aggregate([{"$addFields":
                                                    {"protein_carbohydrates": {"$add":
                                                                                   ["$protein", "$carbohydrates"]}}},
                                               {"$sort":
                                                    {"protein_carbohydrates": -1}}
                                               ]
                                              )
    nutrition_collection_for_repeating_values=[]
    sameNutritionRepeatAfterNDays=3
    result=list(result)[0:50]


    currentDate = datetime.datetime.now().date()
    sameDays=[]
    all_days=[]
    for days in range(n):
        nextdate = currentDate + datetime.timedelta(days=days)
        sameDays=str(nextdate)
        time=[]
        day = []
        daily=[]
        index1=random.choice(list(range(0,5)))
        index2=random.choice(list(range(5,10)))
        index3=random.choice(list(range(10,15)))
        indices=[index1, index2, index3]
        for dt in range(3):
            time = []
            ratio_sub=ratio/len(indices)
            for index in indices:
                data=result[index]
                id=str(data["_id"])
                fats=data["fats"]
                carbohydrates=data["carbohydrates"]
                protein=data["protein"]
                calories = calorieCounter(protein, carbohydrates, fats)  # data["calories"]
                modified_calories=calories+ratio_sub
                protein, carbohydrates, fats, grams = balanceMacroNutrients(protein, carbohydrates, fats, ratio_sub, (
                            calories - modified_calories) / calories, )
                check=calorieCounter(protein,carbohydrates,fats)

                time.append({"sameNutrition":id,"nutrition":nutrition(nutritionName=data["nutritionName"],
                                                                  fats=fats,grams=grams,calories=calories,
                                                                  carbohydrates=carbohydrates,description="",
                                                                 photos=data["photos"]["photosUrl"],protein=protein)})
            daily={"dayTime": time_in_day[dt], "time": time}
            day.append(daily)
        all_days.append({"sameDay": sameDays, "day": day})
    schedule_collect = conn["schedulenf"]["schedulenfs"]
    myquery = {"userId": userId}

    newvalues = {"$set": {"document": all_days}}
    data2 = schedule_collect.find_one_and_update(myquery, newvalues)
    if data2 is None:
        newvalues = {"userId": userId, "document": all_days, }
        data2 = schedule_collect.insert_one(newvalues)
    pass
if __name__ == '__main__':
    loop = asyncio.get_event_loop()
    loop.run_until_complete(run(loop, ))
    loop.run_forever()





# Little/no exercise: BMR * 1.2 = Total Calorie Need
# Light exercise: BMR * 1.375 = Total Calorie Need
# Moderate exercise (3-5 days/wk): BMR * 1.55 = Total Calorie Need
# Very active (6-7 days/wk): BMR * 1.725 = Total Calorie Need
# Extra active (very active & physical job): BMR * 1.9 = Total Calorie Need