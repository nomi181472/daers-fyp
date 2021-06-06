import express, { Request, Response }  from "express";
import { BadRequestError } from "../errors/bad-request-error";
import { requireAuth } from "../middlewares/require-auth";
import {ExerciseTrack} from "../models/exercise-track";
var router = express.Router();
router.post("/api-gateway/current-user/exercise-track/addRunning",
requireAuth, (req: Request, res: Response) => {
  const {
    date,
    running,time,weight
  } = req.body;
  const obj = new ExerciseTrack();
  if (req.currentUser!.id) {
    const result = obj.AddRunning({ date, running ,time,weight}, req.currentUser!.id);
    if (!result)
      throw new BadRequestError("error exercise-track");
  }
  res.send({});
});

export { router as addRunning };
