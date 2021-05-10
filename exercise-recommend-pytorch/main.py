
import asyncio
from nats.aio.client import Client as NATS
from stan.aio.client import Client as STAN
import json
import time
import pymongo
import datetime

async def run(loop):
    # Use borrowed connection for NATS then mount NATS Streaming
    # client on top.
    nc = NATS()
    sc = STAN()
    await nc.connect(io_loop=loop)
    await sc.connect("daers", "muscle-detection-srv", nats=nc)
    subject = "eschedule:created"
    async def cb(msg):
        nonlocal  sc

        print("Subject:"+subject+"Received a message (seq={}): {}".format(msg.seq, msg.data))
        try:
            my_json = msg.data.decode('utf8').replace("'", '"')
            data = json.loads(my_json)

            print(data)

        except Exception as e:

            print(e)

    # Subscribe to get all messages from the beginning.

    await sc.subscribe(subject, durable_name="durable", queue="", cb=cb)


def get_user_information(dbdocument):




def add_document(same_day,current,same_exercise,exerciseName,sets,reps,description,photos):
    return {"sameDay":same_day,"day":current.append(add_day(same_exercise,exerciseName,sets,reps,description,photos))}
def add_day(same_exercise,exerciseName,sets,reps,description,photos):
    return {"sameExercise":same_exercise,"exercise":exercise(exerciseName,sets,reps,description,photos)}
def exercise(exerciseName,sets,reps,description,photos):
    return { "exerciseName": exerciseName, "sets": sets,"reps": reps, "description": description,"photos":photos };
def add_schedule(N,dbdocument):
    userData=get_user_information(dbdocument)
    for i in range(N):
        currentDate=datetime.datetime.now().date()
        nextdate=currentDate+datetime.timedelta(days=i)



if __name__ == '__main__':

    # loop = asyncio.get_event_loop()
    # loop.run_until_complete(run(loop,))
    # loop.run_forever()
    #
    client = pymongo.MongoClient("localhost", 27017)
    #db = client.list_database_names()
    dbdocument=client["schedulee"]
    dbcollection=dbdocument["schedulees"]

    userId="sd"
    #a=db.find_one_and_update({"userId":userId})
    add_schedule(30,dbdocument)
    # document: {
    #     sameDay: string;
    # day: {
    #     sameExercise: String;
    #
    # }[];
    # }[];




