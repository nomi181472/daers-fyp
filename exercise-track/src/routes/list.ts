import express, { Request, Response }  from "express";
import { requireAuth } from "../middlewares/require-auth";
import {ExerciseTrack} from "../models/exercise-track";
var router = express.Router();



router.get("/api-gateway/current-user/exercise-track/:userId",
requireAuth, async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const obj = new ExerciseTrack();
  
  //const result=await obj.getAllData(userId);
 
});

export { router as listDiet };
