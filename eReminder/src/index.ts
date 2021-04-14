import mongoose from "mongoose";
import { app } from "./app";
const start = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/schedulee", {
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
