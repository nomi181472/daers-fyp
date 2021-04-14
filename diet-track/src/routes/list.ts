import express, { Request, Response }  from "express";
import { requireAuth } from "../middlewares/require-auth";
import {DietTrack} from "../models/diet-track";
var router = express.Router();



router.get("/api-gateway/current-user/diet-track/:userId",
requireAuth, async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const obj = new DietTrack();
  
  const result=await obj.getAllData(userId);
  
  console.log(result);
  res.send(result);
});

export { router as listDiet };
