import mongoose from "mongoose";
import { app } from "./app";
import { natsWrapper } from "./nats-wrapper";
import { UserCreatedListener } from './events/listeners/user-created-listener';
const start = async () => {
  try {
    await natsWrapper.connect("daers", "daers-schedule", "http://localhost:4222")
    natsWrapper.client.on("close", () => {
      console.log("NATS connection closed!");
      process.exit();
     
    });
    process.on("SIGNINT", () => natsWrapper.client.close());
  
    process.on("SIGTERM", () => natsWrapper.client.close());
    new UserCreatedListener(natsWrapper.client).listen()
    await mongoose.connect("mongodb://localhost:27017/schedulee", {
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
