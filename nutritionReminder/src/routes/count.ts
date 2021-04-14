import express, { Router, Request, Response } from 'express';
import {Reminder} from "../models/Reminder";
const route = Router();
route.get("/api-gateway/current-user/nutrition-schedule/count/:id", async (req: Request, res: Response) => {
  const reminder = new Reminder();
  
  const {id}=req.params
  const limitE=await reminder.countRemaining(id);
  res.send({"limit":limitE});


});


export { route as countRouter };