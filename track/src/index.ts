import mongoose from "mongoose";
import { app } from "./app";
import { UserCreatedListener } from "./events/listeners/user-created-listener";
import { UserInformationListener } from "./events/listeners/user-information-listener";
import { UserWeightListener } from "./events/listeners/user-weight-listener";
import { natsWrapper } from "./nats-wrapper";

const start = async () => {
  try {
    await natsWrapper.connect("daers", "exercise-track", "http://nats-srv:4222")
    natsWrapper.client.on("close", () => {
      console.log("NATS connection closed!");
      process.exit();
     
    });
    process.on("SIGNINT", () => natsWrapper.client.close());
  
    process.on("SIGTERM", () => natsWrapper.client.close());
    //new UserWeightListener(natsWrapper.client).listen();
    new UserCreatedListener(natsWrapper.client).listen();
    new UserInformationListener(natsWrapper.client).listen();
    await mongoose.connect("mongodb://track-mongo-srv:27014/track", {
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
