import express, { Request, Response } from "express";
import { ExerciseSchedule } from "../../src/models/Exercise-Schedule";
import { requireAuth } from "../middlewares/require-auth";
const router = express.Router();
router.get(
  "/api-gateway/current-user/schedulee-user/getschedule",
  requireAuth,
  async (req: Request, res: Response) => {
    const sch = new ExerciseSchedule();
     const schedule = await sch.getUserScheduleId(req.currentUser!.id);

   
    res.status(200).send( {schedulee:schedule} );
  }
);
export { router as getUserScheduleRouter };
