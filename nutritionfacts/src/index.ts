import mongoose from "mongoose";
import { app } from "./app";
const start = () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI  Nutrition must be defined");
      }           //"mongodb://localhost:27017/nutritionfacts"
    mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("connected to NutritionMongodb");
  } catch (err) {
    console.log(err);
  }
  app.listen(3030, () => {
    console.log("NutritionFacts Listening on port 3030");
  });
};
start();
