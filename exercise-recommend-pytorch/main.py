import asyncio
from nats.aio.client import Client as NATS
from stan.aio.client import Client as STAN
import json
import time
import pymongo
import datetime
from model import Attention, Encoder, Decoder, Seq2Seq, translate_sentence
import torch
import torch.nn as nn
import torch.optim as optim
import random
from torchtext.data import Field, TabularDataset, BucketIterator
import spacy
import pandas as pd

async def run(loop):
    # Use borrowed connection for NATS then mount NATS Streaming
    # client on top.
    nc = NATS()
    sc = STAN()
    await nc.connect(io_loop=loop)
    await sc.connect("daers", "exercise-recommend-srv", nats=nc)
    subject = "schedule:generate"
    async def cb(msg):
        nonlocal sc
        print("Subject:" + subject + "Received a message (seq={}): {}".format(msg.seq, msg.data))
        try:

            my_json = msg.data.decode('utf8').replace("'", '"')
            data = json.loads(my_json)
            conn = pymongo.MongoClient("localhost", 27017)
            userId = data["userId"]
            add_schedule(30, conn, userId)
            print("Done")
        except Exception as e:
            print(e)

   # await sc.subscribe(subject, manual_acks=True, queue="", cb=cb)
    await sc.subscribe(subject, durable_name="durable", queue="exercise-recommend-srv",cb=cb)


def get_user_information(conn,id,userId):
    # schedule_user_exercise=conn["schedulee"]["userexerciseschedules"]
    # s_u_e_data=schedule_user_exercise.find_one({"_id":id})
    # muscle = conn["muscle"]["muscles"]
    # m_data=muscle.find_one({"userId":userId},{"abslevel","chestlevel"})
    #
    return {"waist": 33, "wings": 44, "age": 24, "chestlevel": 1, "abslevel": 1, }


def filter_level(level):
    if level == 1:
        return str(1)
    elif level == 2:
        return str(2)
    elif level == 3:
        return str(3)


def filter_ww(level):
    if level < 0:
        return "poor"
    elif level >= 0 and level < 3:
        return "normal"
    elif level >= 3:
        return "good"


def filter_age(age):
    if age < 18:
        return "teen"
    elif age >= 18 and age <= 40:
        return "adult"
    elif age > 40:
        return "old"


def filter_user_data(user_data):
    age = "age"
    chestlevel = "chestlevel"
    abslevel = "abslevel"
    wings = "wings"
    waist = "waist"
    if f'{age}' in user_data:
        user_data[f'{age}'] = filter_age(user_data[f'{age}'])
    if f'{chestlevel}' in user_data:
        user_data[f'{chestlevel}'] = filter_level(user_data[f'{chestlevel}'])
    if f'{abslevel}' in user_data:
        user_data[f'{abslevel}'] = filter_level(user_data[f'{abslevel}'])
    if f'{wings}' in user_data and f'{waist}' in user_data:
        user_data["ww"] = filter_ww(user_data[f'{wings}'] - user_data[f'{waist}'])
        del user_data[f'{wings}']
        del user_data[f'{waist}']
    return user_data


def tokenize(text):
    return [tok.text for tok in spacy_en.tokenizer(text)]
def generate_code():
  ex = pd.read_csv("data/exercises2.csv", index_col=0)
  code = "en"
  exercise_name_dict = {}
  d = list(ex["exerciseName"])
  for i in range(len(d)):
    exercise_name_dict[d[i]] = f'{code} ' + str(i)
  return exercise_name_dict

def init_weights(m):
    for name, param in m.named_parameters():
        if 'weight' in name:
            nn.init.normal_(param.data, mean=0, std=0.01)
        else:
            nn.init.constant_(param.data, 0)


def add_document(same_day, current, same_exercise, exerciseName, sets, reps, description, photos):
    return {"sameDay": same_day,
            "day": current.append(add_day(same_exercise, exerciseName, sets, reps, description, photos))}
def generate_code():
  ex = pd.read_csv("data/exercises2.csv", index_col=0)
  code = "en"
  exercise_name_dict = {}
  d = list(ex["exerciseName"])
  for i in range(len(d)):
    exercise_name_dict[d[i]] = f'{code} ' + str(i)
  return exercise_name_dict

def add_day(same_exercise, ex):
    return {"sameExercise": same_exercise, "exercise": ex}


def exercise(exerciseName, sets, reps, description, photos):
    return {"exerciseName": exerciseName, "sets": sets, "reps": reps, "description": description, "photos": photos};


def predict_exercise(current_category, user_data, source_trans):
    strr =  user_data['age']
    strr += " " + user_data["chestlevel"]
    strr += " " + user_data["abslevel"]
    strr += " " + user_data["ww"]
    strr += " " + current_category
    list_str=[" "]
    exercise_name_dict=generate_code()
    exercise_name_dict_inv ={v: k for k, v in exercise_name_dict.items()}

    for i in strr.split(" "):
        list_str.append(source_trans[i])
    trg, attention = translate_sentence(list_str, source_lang, target_lang, model, device)
    #trg = [' ', 'en', '130', 'en', '113', 'en', '135', 'en', '140']
    trg.pop(0)
    collect_exercises=[]
    original_name=""
    for i in range(len(trg)):

        if i%2!=0:
            original_name =original_name+ " "+trg[i]
        elif i%2==0:
            if original_name in exercise_name_dict_inv:
                collect_exercises.append(exercise_name_dict_inv[original_name])
                if( i <len(trg)-1):
                    original_name=trg[i]
            else:
                original_name = trg[i]
    return collect_exercises



    print(f'predicted trg = {translation}')
    return translation


def source_transform():
    exerciseCategory = {'a': "abdominals", 't': "triceps", "b": "biceps", 's': "shoulders", "c": "chest", "l": "legs",
                        "bk": "back", "cl": "calves"}
    source_code = {"old": "o", "adult": "ad", "teen": "te", "good": "g", "normal": "n", "poor": "p", "3": "3", "1": "1",
                   "2": "2"}
    inv_exerciseCategory = {v: k for k, v in exerciseCategory.items()}
    source_code.update(inv_exerciseCategory)
    return source_code

def getCategory():
    return {
        "Monday": "chest", "Tuesday": "biceps",
        "Wednesday": "triceps", "Thursday": "back",
        "Friday": "shoulders", 'Saturday': "legs", "Sunday": "abdominals"
    }
def add_schedule(N, conn,userId):
    user_data = get_user_information(conn,"",userId)  # get from mongodb
    user_data = filter_user_data(user_data)
    source_trans = source_transform()
    exercise_categories = getCategory()
    all_days=[]
    currentDate = datetime.datetime.now().date()
    for i in range(N):

        nextdate = currentDate + datetime.timedelta(days=i)
        current_Exercise = exercise_categories[nextdate.strftime("%A")]
        collect_exercises=predict_exercise(current_Exercise, user_data, source_trans)
        exercise_db_collection=conn["exercise"]["exercises"]
        all_exercises=[]
        for j in range(len(collect_exercises)):
            details=exercise_db_collection.find_one({"exerciseName":collect_exercises[j]},{"exerciseCategory","exerciseName","photos","_id"})
            sameExercise=str(details["_id"])
            photos=details['photos']["photosUrl"]
            ex=exercise(details["exerciseName"],3,[10,10,10]," ",photos)
            all_exercises.append({"exercise":ex,"sameExercise":sameExercise})
        all_days.append({"sameDay":str(nextdate),"day":all_exercises})
    document=[]
    #document.append(all_days)
    schedule_collect=conn["schedulee"]["schedulees"]
    myquery = {"userId": userId}
    #data=schedule_collect.find_one(myquery)

    newvalues = {"$set": {"document":all_days}}
    data2 = schedule_collect.find_one_and_update(myquery, newvalues)
    if data2 is None:
        newvalues = {"userId": userId, "document": all_days, }
        data2 = schedule_collect.insert_one(newvalues)
    pass










# globals
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
spacy_en = spacy.load("en_core_web_sm")
total_acc, total_count = 0, 0
log_interval = 5
source_lang = Field(tokenize=tokenize,
                    init_token='<sos>',
                    eos_token='<eos>',
                    lower=True,
                    include_lengths=True)
target_lang = Field(tokenize=tokenize,
                    init_token='<sos>',
                    eos_token='<eos>',
                    lower=True)
field = {"source": ("src", source_lang), "target": ("trg", target_lang)}
train_data, test_data = TabularDataset.splits(
    path="data",
    train="algorithmic_generated2.csv",
    test="algorithmic_generated2.csv",
    format="csv",
    fields=field)
source_lang.build_vocab(train_data, max_size=10000, min_freq=1)

target_lang.build_vocab(test_data, max_size=10000, min_freq=1)
num_epochs = 20
learning_rate = 0.001
batch_size = 32
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
train_iterator, test_iterator = BucketIterator.splits((train_data, test_data),
                                                      batch_size=batch_size,
                                                      sort_within_batch=True,
                                                      sort_key=lambda x: len(x.src),
                                                      device=device)

print(f"Number of training examples: {len(train_data.examples)}")
print(f"Number of validation examples: {len(test_data.examples)}")
print(f"Unique tokens in source (de) vocabulary: {len(source_lang.vocab)}")
print(f"Unique tokens in target (en) vocabulary: {len(target_lang.vocab)}")
INPUT_DIM = len(source_lang.vocab)
OUTPUT_DIM = len(target_lang.vocab)
ENC_EMB_DIM = 256
DEC_EMB_DIM = 256
ENC_HID_DIM = 512
DEC_HID_DIM = 512
ENC_DROPOUT = 0.5
DEC_DROPOUT = 0.5
SRC_PAD_IDX = source_lang.vocab.stoi[source_lang.pad_token]

attn = Attention(ENC_HID_DIM, DEC_HID_DIM)
enc = Encoder(INPUT_DIM, ENC_EMB_DIM, ENC_HID_DIM, DEC_HID_DIM, ENC_DROPOUT)
dec = Decoder(OUTPUT_DIM, DEC_EMB_DIM, ENC_HID_DIM, DEC_HID_DIM, DEC_DROPOUT, attn)

model = Seq2Seq(enc, dec, SRC_PAD_IDX, device).to(device)
#optimizer = optim.Adam(model.parameters())
TRG_PAD_IDX =source_lang.vocab.stoi[target_lang.pad_token]
#criterion = nn.CrossEntropyLoss(ignore_index=TRG_PAD_IDX)
model.apply(init_weights)
model.load_state_dict(torch.load('weights/tut4-model (1).pt'))


if __name__ == '__main__':
    loop = asyncio.get_event_loop()
    loop.run_until_complete(run(loop,))
    loop.run_forever()


