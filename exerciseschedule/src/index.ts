import mongoose from "mongoose";
import { app } from "./app";
import { natsWrapper } from "./nats-wrapper";
import { UserCreatedListener } from './events/listeners/user-created-listener';
import { UserInformationListener } from "./events/listeners/user-information-listener";
const start = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI  Exercise must be defined");
      }
    // await natsWrapper.connect("daers", "daers-schedule", "http://localhost:4222")
    // natsWrapper.client.on("close", () => {
    //   console.log("NATS connection closed!");
    //   process.exit();
     
    // });
    // process.on("SIGNINT", () => natsWrapper.client.close());
  
    // process.on("SIGTERM", () => natsWrapper.client.close());
    // new UserCreatedListener(natsWrapper.client).listen()
    // new UserInformationListener(natsWrapper.client).listen()
    //"mongodb://localhost:27017/schedulee"
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("connected to schedulee mongodb");
  } catch (err) {
    console.log(err);
  }
  app.listen(3021, () => {
    console.log("schedulee Listening on port 3021");
  });
};
start();
