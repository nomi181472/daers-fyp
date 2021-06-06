import express, { Request, Response }  from "express";
import { requireAuth } from "../middlewares/require-auth";
import {DietTrack} from "../models/diet-track";
var router = express.Router();
router.get("/api-gateway/currentuser/diettrack",
requireAuth, async (req: Request, res: Response) => {
  const obj = new DietTrack();
  const result=await obj.getAllData( req.currentUser!.id);
  console.log(result);
  res.send(result);
});
export { router as listDiet };
