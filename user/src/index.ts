import mongoose from "mongoose";
import { app } from "./app";
import { ScheduleCreatedListener } from "./events/listeners/schedule-created-listeners";
import { natsWrapper } from "./nats-wrapper";
const start = async () => {
  try {
    await natsWrapper.connect("daers", "abc", "http://localhost:4222")
    natsWrapper.client.on("close", () => {
      console.log("NATS connection closed!");
      process.exit();
     
    });
    process.on("SIGNINT", () => natsWrapper.client.close());
  
  process.on("SIGTERM", () => natsWrapper.client.close());
    new ScheduleCreatedListener(natsWrapper.client).listen()
    await mongoose.connect("mongodb://localhost:27017/User", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("connected to User mongodb");
  } catch (err) {
    console.log(err);
  }
  app.listen(3010, () => {
    console.log("User Listening on port 3010");
  });
};
start();
