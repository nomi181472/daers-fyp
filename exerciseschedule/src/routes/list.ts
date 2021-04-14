import express, { Request, Response } from "express";
import { exerciseScheduleModel } from "../models/exercise-schedule-repo/exercise-schedule-repo";
import { ExerciseSchedule } from "../models/Exercise-Schedule";
import { BadRequestError } from "../errors/bad-request-error";

const router = express.Router();
router.get(
  "/api-gateway/current-user/schedulee",
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
