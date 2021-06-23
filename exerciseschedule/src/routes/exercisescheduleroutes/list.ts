import express, { Request, Response } from "express";

import { body, param } from "express-validator";
import { BadRequestError } from "../../errors/bad-request-error";
import { UnAuthorizedError } from "../../errors/unAuthorized-errors";
import { UnknownRouteError } from "../../errors/unknown-Route-error";
import { requireAuth } from "../../middlewares/require-auth";
import { validateRequest } from "../../middlewares/validate-request";
import { ExerciseSchedule } from "../../models/Exercise-Schedule";

const router = express.Router();
router.get(
  "/api/exerciseschedule/listschedule",
  async (req: Request, res: Response) => {
    const sch = new ExerciseSchedule();
    const schedule = await sch.listSchedules();
    if (!schedule) {
      throw new BadRequestError("error while listing");
    }
    //const schedule = await exerciseScheduleModel.find({});
    res.send(schedule);
  }
);
export { router as listRouter };
