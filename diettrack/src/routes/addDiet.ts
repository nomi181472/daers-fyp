import express, { Request, Response }  from "express";
import { requireAuth } from "../middlewares/require-auth";
import {DietTrack} from "../models/diet-track";
var router = express.Router();



router.post("/api-gateway/current-user/diet-track/add",
requireAuth, (req: Request, res: Response) => {
  const {
    
  
    dietScheduleId,
    dayDate,
    totalCaloriesIntake,
    totalProteinIntake,
    totalCarbohydratesIntake,
    totalFatsIntake,
     } = req.body;
  const obj = new DietTrack();
  const userId = req.currentUser!.id;
  const result=obj.addNutritions({
    userId,
    dietScheduleId,
    dayDate,
    totalCaloriesIntake,
    totalProteinIntake,
    totalCarbohydratesIntake,
    totalFatsIntake
  });
  
 
  res.send({result});
});

export { router as addDiet };
