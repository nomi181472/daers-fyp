import nats from "node-nats-streaming";
import { EScheduleCreatedPublisher } from "./events/ESchedule-Created-Event-Publisher";

console.clear();
let stan = nats.connect("daers", "abc2", {
  url: "http://localhost:4222",
});

stan.on("connect", async () => {
  console.log("Publisher connected to NATS");
  const publisher = new EScheduleCreatedPublisher(stan)
  try {
    var data={age: 12,bmi: 2,weight:2,height:2,userId: "23"}
    await publisher.publish(data)
  }
  catch (err) {
    console.error(err);
  }
  // const data = JSON.stringify({
  //   id: "123",
  //   title: "connect",
  //   price: 20,
  // });
  // stan.publish("daers:created", data, () => {
  //   console.log("event Published");
  // });
});
