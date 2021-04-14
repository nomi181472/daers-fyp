import mongoose from "mongoose";
import { app } from "./app";
const start = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/exercise", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("connected to exercise mongodb");
  } catch (err) {
    console.log(err);
  }
  app.listen(3020, () => {
    console.log("exercise Listening on port 3020");
  });
};
start();
