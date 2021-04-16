
from prediction import setModel,predict
def eventmanage(userId,model,class_name,mycol):

    x = mycol.find_one({"userId": userId}, {"photos": 1})
    backPose=x["photos"]["backPose"]
    frontPose=x["photos"]["frontPose"]
    print(backPose,frontPose)
    predict(model,class_name)

