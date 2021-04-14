import express, { Request, Response }  from "express";
import { requireAuth } from "../middlewares/require-auth";
import {DietTrack} from "../models/diet-track";
var router = express.Router();



router.post("/api-gateway/current-user/diet-track/add",
requireAuth, (req: Request, res: Response) => {
  const {
    userId,
    dietScheduleId,
    dayDate,
    totalCaloriesIntake,
    totalProteinIntake,
    totalCarbohydratesIntake,
    totalFatsIntake,
    currentWeight } = req.body;
  const obj = new DietTrack();
  const result=obj.addNutritions({
    userId,
    dietScheduleId,
    dayDate,
    totalCaloriesIntake,
    totalProteinIntake,
    totalCarbohydratesIntake,
    totalFatsIntake,
    currentWeight
  });
  
 
  res.send({});
});

export { router as addDiet };
