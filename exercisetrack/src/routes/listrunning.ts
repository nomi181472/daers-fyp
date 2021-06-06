import express, { Request, Response }  from "express";
import { requireAuth } from "../middlewares/require-auth";
import {ExerciseTrack} from "../models/exercise-track";
var router = express.Router();
router.get("/api-gateway/current-user/exercise-track/listRunning",
requireAuth, async (req: Request, res: Response) => {
  const userId = req.currentUser!.id
  const obj = new ExerciseTrack();
  
  const result=await obj.getAllRunningData(userId);
  res.send(result);
});

export { router as listRunningData };
