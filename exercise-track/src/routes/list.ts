import express, { Request, Response }  from "express";
import { requireAuth } from "../middlewares/require-auth";
import {ExerciseTrack} from "../models/exercise-track";
var router = express.Router();



router.get("/api-gateway/current-user/exercise-track/:exerciseName",
requireAuth, async (req: Request, res: Response) => {
  const userId = req.currentUser!.id
  const obj = new ExerciseTrack();
  
  const result=await obj.getAllWeightData(userId,req.params.exerciseName.replace("-",' '));
  res.send(result);
});

export { router as listExercise };
