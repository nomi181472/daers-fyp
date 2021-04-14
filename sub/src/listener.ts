import nats from "node-nats-streaming";
import { randomBytes } from "crypto";

import { EScheduleCreatedListener } from "./events/ScheduleCreatedListener";
console.clear();
const stan = nats.connect("daers", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});
stan.on("connect", () => {
  console.log("listener connected to NATs");
  stan.on("close", () => {
    console.log("NATS connection closed!");
    process.exit();
  });
  process.on("SIGNINT", () => stan.close());

process.on("SIGTERM", () => stan.close());

new EScheduleCreatedListener(stan).listen()
  // const options = stan
  //   .subscriptionOptions()
  //   .setManualAckMode(true)
  //   .setDeliverAllAvailable()
  //   .setDurableName("daers-backened");

//   const subsctiption = stan.subscribe(
//     "daers:created",
//     "queue-group-name",

//     options
//   );
//   subsctiption.on("message", (msg: Message) => {
//     const data = msg.getData();
//     if (typeof data === "string") {
//       console.log(`recieved event #: ${msg.getSequence()}, with data:${data}`);
//     }
//     console.log("message Recieved");
//     msg.ack();
//   });
 });




