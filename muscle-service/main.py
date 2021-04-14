import pymongo
import asyncio
from nats.aio.errors import ErrConnectionClosed, ErrTimeout, ErrNoServers
import json
import nest_asyncio
import tornado.ioloop
import tornado.gen
import time
import asyncio
from nats.aio.client import Client as NATS
from stan.aio.client import Client as STAN


async def run(loop):
    # Use borrowed connection for NATS then mount NATS Streaming
    # client on top.
    nc = NATS()
    sc = STAN()
    await nc.connect(io_loop=loop)
    await sc.connect("daers", "client-123", nats=nc)

    # Example async subscriber
    async def cb(msg):
        print("Received a message (seq={}): {}".format(msg.seq, msg.data))
        myclient = pymongo.MongoClient("mongodb://localhost:27017/")
        myDBName = "muscle"
        mydb = myclient[myDBName]
        print(myclient.list_database_names())
        dblist = myclient.list_database_names()
        if myDBName in dblist:
            print("The database exists: " + myDBName)
        myColumn = "muscles"
        mycol = mydb[myColumn]
        collist = mydb.list_collection_names()
        print(collist);
        if myColumn in collist:
            print("The collection exists: " + myColumn)
        # mydict = { "name": "John", "address": "Highway 37" }

        # x = mycol.insert_one(mydict)
        # x = mycol.find_one()
        # print(x)
        # for x in mycol.find():
        #  print(x)

        userId = "606956f279de6e3c5c1d945d";
        x = mycol.find_one({"userId": userId}, )
        print(x)

        # myquery = { "address": "Valley 345" }
        # newvalues = { "$set": { "address": "Canyon 123" } }

        # mycol.update_one(myquery, newvalues)



    # Subscribe to get all messages from the beginning.
    await sc.subscribe("eschedule:created", durable_name="durable", queue="", cb=cb)

if __name__ == '__main__':
    loop = asyncio.get_event_loop()
    loop.run_until_complete(run(loop))
    loop.run_forever()
