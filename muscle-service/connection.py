from nats.aio.client import Client as NATS
from stan.aio.client import Client as STAN
from eventmanager import eventmanage
import json
async def run(loop,model,class_name,mycol):
    # Use borrowed connection for NATS then mount NATS Streaming
    # client on top.
    nc = NATS()
    sc = STAN()
    await nc.connect(io_loop=loop)
    await sc.connect("daers", "client-123", nats=nc)
    async def cb(msg):
        print("Received a message (seq={}): {}".format(msg.seq, msg.data))
        my_json = msg.data.decode('utf8').replace("'", '"')
        data = json.loads(my_json)
        eventmanage(data["userId"],model,class_name,mycol)





    # Decode UTF-8 bytes to Unicode, and convert single quotes
    # to double quotes to make it valid JSON




    # Load the JSON to a Python list & dump it back out as formatted JSON





    # Subscribe to get all messages from the beginning.
    await sc.subscribe("eschedule:created", durable_name="durable", queue="", cb=cb)