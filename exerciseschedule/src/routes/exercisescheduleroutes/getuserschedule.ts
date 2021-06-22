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
  "/api-gateway/current-user/schedulee-user/getschedule",
  requireAuth,
  async (req: Request, res: Response) => {
    const sch = new ExerciseSchedule();
     const schedule = await sch.getUserScheduleId(req.currentUser!.id);

   
    res.status(200).send( {schedulee:schedule} );
  }
);
export { router as getUserScheduleRouter };
