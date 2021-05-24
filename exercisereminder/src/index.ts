import mongoose from "mongoose";
import { app } from "./app";
const start = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI  Exercise must be defined");
    }
    //mongodb://localhost:27017/schedulee",
    await mongoose.connect(process.env.MONGO_URI ,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("connected to exerciseSchedule Reminder mongodb");
  } catch (err) {
    console.log(err);
  }
  app.listen(3022, () => {
    console.log("exercise Listening on port 3022");
  });
};
start();
