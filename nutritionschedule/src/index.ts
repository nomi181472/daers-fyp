import mongoose from "mongoose";
import { app } from "./app";
import { UserCreatedListener } from "./events/listeners/user-created-listener";
import { UserInformationListener } from "./events/listeners/user-information-listener";
import { natsWrapper } from "./nats-wrapper";
const start = async () => {
  try {
    await natsWrapper.connect("daers", "nutrition-schedule", "http://localhost:4222")
    natsWrapper.client.on("close", () => {
      console.log("NATS connection closed!");
      process.exit();
     
    });
    process.on("SIGNINT", () => natsWrapper.client.close());
  
    process.on("SIGTERM", () => natsWrapper.client.close());
    new UserCreatedListener(natsWrapper.client).listen();
    new UserInformationListener(natsWrapper.client).listen()
    await mongoose.connect("mongodb://localhost:27017/schedulenf", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("connected to schedulenf mongodb");
  } catch (err) {
    console.log(err);
  }
  app.listen(3031, () => {
    console.log("schedulenf Listening on port 3031");
  });
};
start();
