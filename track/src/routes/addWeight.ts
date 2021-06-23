import express, { Request, Response }  from "express";
import { BadRequestError } from "../errors/bad-request-error";
import { requireAuth } from "../middlewares/require-auth";
import {ExerciseTrack} from "../models/exercise-track";
var router = express.Router();
router.post("/api-gateway/current-user/exercise-track/addWeight",
requireAuth, async (req: Request, res: Response) => {
  const {
    weightCapacity
  } = req.body;
  const obj = new ExerciseTrack();
  if (req.currentUser!.id) {
    const result = await obj.addWeightCapacity(weightCapacity, req.currentUser!.id);
    if (!result)
      throw new BadRequestError("error exercise-track");
  }
  res.send({});
});

export { router as addWeightCapacity };
