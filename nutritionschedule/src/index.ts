import mongoose from "mongoose";
import { app } from "./app";
const start = async () => {
  try {
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
