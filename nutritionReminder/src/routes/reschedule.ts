import express, { Router, Request, Response } from 'express';
import { BadRequestError } from '../errors/bad-request-error';
import {Reminder} from "../models/Reminder";
const route = Router();
route.get("/api-gateway/current-user/nutrition-schedule/reschedule/:id", async (req: Request, res: Response) => {
  const reminder = new Reminder();
  const {id}=req.params
  const reminderE = await reminder.reScheduleNf(id);
  if (!reminder)
  {
    throw new BadRequestError("id not found")
    }
  res.send(reminderE);


});


export { route as reScheduleRouter };