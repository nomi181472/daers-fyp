import mongoose from "mongoose";
import { app } from "./app";
import { UserCreatedListener } from "./events/listeners/user-created-listener";
import { natsWrapper } from "./nats-wrapper";
const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY is Required..");
  }
  try {
  //   await natsWrapper.connect("daers", "abc", "http://localhost:4222")
  //   natsWrapper.client.on("close", () => {
  //     console.log("NATS connection closed!");
  //     process.exit();
     
  //   });
  //   process.on("SIGNINT", () => natsWrapper.client.close());
  
  // process.on("SIGTERM", () => natsWrapper.client.close());
   // new UserCreatedListener(natsWrapper.client).listen()
    //mongodb://localhost-mongo-srv:27017/User
    if (!process.env.MONGO_URI) {
    throw new Error("user database must be defind")
    }
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("connected to User mongodb");
  } catch (err) {
    console.log(err);
  }

  app.listen(3010, () => {
    console.log("User Listening on port 3010!");
  });
};
start();
 