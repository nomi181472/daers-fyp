import mongoose from "mongoose";
import { app } from "./app";
import { UserWeightListener } from "./events/listeners/user-weight-listener";
import { natsWrapper } from "./nats-wrapper";

const start = async () => {
  try {
    
    //   await natsWrapper.connect("daers", "diet-track", "http://localhost:4222")
    //   natsWrapper.client.on("close", () => {
    //     console.log("NATS connection closed!");
    //     process.exit();
       
    //   });
    //   process.on("SIGNINT", () => natsWrapper.client.close());
    
    // process.on("SIGTERM", () => natsWrapper.client.close());
    // new UserWeightListener(natsWrapper.client).listen();
    //"mongodb://localhost:27017/diettrack"
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI  Nutrition must be defined");
    }
    //"mongodb://localhost:27017/diettrack"
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("connected to diettrack mongodb");
  } catch (err) {
    console.log(err);
  }
  app.listen(3033, () => {
    console.log("diettrack Listening on port 3033");
  });
};
start();