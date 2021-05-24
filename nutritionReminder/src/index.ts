import mongoose from "mongoose";
import { app } from "./app";
const start = async () => {
  try {

    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI  Nutrition must be defined");
    }
    //"mongodb://localhost:27017/schedulenf"
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("connected to nutritionSchedule Reminder mongodb");
  } catch (err) {
    console.log(err);
  }
  app.listen(3032, () => {
    console.log("nutritionReminder Listening on port 3032");
  });
};
start();
