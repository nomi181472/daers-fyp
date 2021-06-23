import mongoose from "mongoose";
import { app } from "./app";
const start = () => {
  try {
    mongoose.connect("mongodb://localhost:27017/nutritionfacts", {
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
