import express, { Request, Response } from "express";

import { exerciseScheduleModel } from "../models/exercise-schedule-repo/exercise-schedule-repo";
import { UnknownRouteError } from "../errors/unknown-Route-error";
import mongoose from "mongoose";
import { ExerciseSchedule } from "../models/Exercise-Schedule";
import { requireAuth } from "../middlewares/require-auth";
import { BadRequestError } from "../errors/bad-request-error";
const router = express.Router();
router.get(
  "/api-gateway/current-user/schedulee/:id",
  requireAuth,
  async (req: Request, res: Response) => {
    const sch = new ExerciseSchedule();
    const schedule = await sch.getScheduleId(req.params.id);

    if (!schedule) {
      throw new UnknownRouteError("scheduleid not found or error while get id");
    }
    res.send({ schedule });
  }
);
export { router as getIdRouter };
