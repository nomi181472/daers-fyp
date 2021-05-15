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
    await sc.connect("daers", "muscle-detection-srv", nats=nc)
    subject = "muscle-detection:created"
    async def cb(msg):
        nonlocal  sc

        print("Subject:"+subject+"Received a message (seq={}): {}".format(msg.seq, msg.data))
        try:
            my_json = msg.data.decode('utf8').replace("'", '"')
            data = json.loads(my_json)

            eventmanage(data["userId"],model,class_name,mycol)

        except Exception as e:

            print(e)

    # Subscribe to get all messages from the beginning.

    await sc.subscribe(subject, durable_name="durable", queue="muscle-detection-srv", cb=cb)