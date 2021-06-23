import asyncio
from nats.aio.errors import ErrConnectionClosed, ErrTimeout, ErrNoServers
from nats.aio.client import Client as NATS
from stan.aio.client import Client as STAN
import json
import nest_asyncio

i = 0


async def run(loop, i):
    ns = NATS()
    await ns.connect("localhost:4222", loop=loop)
    nc = STAN()

    await nc.connect("daers", "920234", ns)

    async def message_handler(msg):
        subject = msg.subject
        reply = msg.reply
        data = msg.data.decode()
        print("Received a message on '{subject} {reply}': {data}".format(
            subject=subject, reply=reply, data=data))

    # Simple publisher and async subscriber via coroutine.
    # sid = await nc.subscribe("daers", cb=message_handler)

    # Stop receiving after 2 messages.
    # await nc.auto_unsubscribe(sid, 2)

    i = i + 1
    j = 0
    while (1):
        yes = int(input())

        if (yes):
            break
        else:
            j = j + 1
            data = {"age": j, "bmi": 2, "weight": 2,
                    "height": 2, "userId": "23"}
            print(json.dumps(data))
            await nc.publish("eschedule:created", json.dumps(data).encode())

    # await nc.publish(reply, b'I can help')

    # Use queue named 'workers' for distributing requests
    # among subscribers.

    # Terminate connection to NATS.


if __name__ == '__main__':
    try:
        loop = asyncio.get_event_loop()
        nest_asyncio.apply()
        fut = loop.create_task(run(loop, i))
        loop.run_until_complete(fut)
        # loop.run_until_complete()
        loop.stop()

        # loop.close()
    except Exception as e:
        print("closed")
