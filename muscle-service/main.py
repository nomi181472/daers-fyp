# import pymongo
# import asyncio
# from nats.aio.errors import ErrConnectionClosed, ErrTimeout, ErrNoServers
# import json
# import nest_asyncio
# import tornado.ioloop
# import tornado.gen
# import time
import pymongo
from prediction import setModel
from connection import run
import asyncio
import os

import cloudinary.uploader
import cloudinary.api
import cloudinary as Cloud
if __name__ == '__main__':

    myclient = pymongo.MongoClient("mongodb://localhost:27017/")
    myDbName="muscle"
    mydb = myclient[myDbName]
    dblist = myclient.list_database_names()
    if myDbName in dblist:
        print("The database exists: " + myDbName)
        pass
    myColumnName="muscles"
    mycol = mydb[myColumnName]
    collist = mydb.list_collection_names()
    if myColumnName in collist:
        print("The collection exists: " + myColumnName)
        pass
    model, class_name = setModel()
    loop = asyncio.get_event_loop()
    loop.run_until_complete(run(loop,model,class_name,mycol))
    loop.run_forever()
