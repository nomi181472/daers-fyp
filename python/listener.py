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

    # Subscribe to get all messages from the beginning.
    await sc.subscribe("eschedule:created", durable_name="durable", queue="", cb=cb)

if __name__ == '__main__':
    loop = asyncio.get_event_loop()
    loop.run_until_complete(run(loop))
    loop.run_forever()
