import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
  try {
//     await natsWrapper.connect("daers", "abc", "http://localhost:4222")
//     natsWrapper.client.on("close", () => {
//       console.log("NATS connection closed!");
//       process.exit();
     
//     });
//     process.on("SIGNINT", () => natsWrapper.client.close());
  
//   process.on("SIGTERM", () => natsWrapper.client.close());
    await mongoose.connect("mongodb://localhost:27017/diettrack", {
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
