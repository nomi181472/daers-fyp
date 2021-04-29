import mongoose from "mongoose";
import { app } from "./app";
import { natsWrapper } from './nats-wrapper';
const start = async () => {
  try {
  //      await natsWrapper.connect("daers", "muscle-client", "http://localhost:4222")
  //   natsWrapper.client.on("close", () => {
  //     console.log("NATS connection closed!");
  //     process.exit();
     
  //   });
  //   process.on("SIGNINT", () => natsWrapper.client.close());
  
  // process.on("SIGTERM", () => natsWrapper.client.close());
    await mongoose.connect("mongodb://localhost:27017/muscle", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("connected to muscle mongodb");
  } catch (err) {
    console.log(err);
  }
  app.listen(3400, () => {
    console.log("muscle Listening on port 3400");
  });
};
start();
