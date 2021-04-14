import express, { Router, Request, Response } from 'express';
import {Reminder} from "../models/Reminder";
const route = Router();
route.get("/api-gateway/current-user/nutrition-schedule/reminder/:id", async (req: Request, res: Response) => {
  const reminder = new Reminder();
  const {id}=req.params
  const reminderE=await reminder.sortDates(id);
  res.send(reminderE);


});


export { route as sortRouter };