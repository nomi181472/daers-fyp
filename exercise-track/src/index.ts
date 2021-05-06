import mongoose from "mongoose";
import { app } from "./app";
import { UserWeightListener } from "./events/listeners/user-weight-listener";
import { natsWrapper } from "./nats-wrapper";

const start = async () => {
  try {
    await natsWrapper.connect("daers", "exercise-track", "http://localhost:4222")
    natsWrapper.client.on("close", () => {
      console.log("NATS connection closed!");
      process.exit();
     
    });
    process.on("SIGNINT", () => natsWrapper.client.close());
  
    process.on("SIGTERM", () => natsWrapper.client.close());
    new UserWeightListener(natsWrapper.client).listen();
    await mongoose.connect("mongodb://localhost:27017/exercisetrack", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("connected to exercisetrack mongodb");
  } catch (err) {
    console.log(err);
  }
  app.listen(3023, () => {
    console.log("exercisetrack Listening on port 3023");
  });
  
};
start();
