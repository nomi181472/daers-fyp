import express, { Request, Response }  from "express";
import { BadRequestError } from "../errors/bad-request-error";
import { requireAuth } from "../middlewares/require-auth";
import {DietTrack} from "../models/diet-track";
var router = express.Router();



router.post("/api-gateway/current-user/diet-track/add",
requireAuth, async (req: Request, res: Response) => {
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
  const result=await obj.addNutritions({
    userId,
    dietScheduleId,
    dayDate,
    totalCaloriesIntake,
    totalProteinIntake,
    totalCarbohydratesIntake,
    totalFatsIntake
  });
  if (!result) {
    throw new BadRequestError("please update your information section")
    
  }
  
 
  res.send({result});
});

export { router as addDiet };
