import mongoose from "mongoose";
import { app } from "./app";
const start = async () => {
  try { //mongodb://localhost-mongo-srv:27017/exercise
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI  Exercise must be defined");
      }
    await mongoose.connect(process.env.MONGO_URI, {
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
