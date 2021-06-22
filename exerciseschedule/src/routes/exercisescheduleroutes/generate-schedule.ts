import express, { Request, Response } from "express";
import { body, param } from "express-validator";
import { BadRequestError } from "../../errors/bad-request-error";
import { UnAuthorizedError } from "../../errors/unAuthorized-errors";
import { UnknownRouteError } from "../../errors/unknown-Route-error";
import { ScheduleCreatedPublisher } from "../../events/publishers/schedule-generate-publisher";
import { requireAuth } from "../../middlewares/require-auth";
import { validateRequest } from "../../middlewares/validate-request";
import { ExerciseSchedule } from "../../models/Exercise-Schedule";
import { natsWrapper } from "../../nats-wrapper";

const router = express.Router();
router.get(
  "/api-gateway/current-user/schedulee-user/generateSchedule",
  requireAuth,
  async (req: Request, res: Response) => {
    
     const userId=req.currentUser!.id;

    try {
     new ScheduleCreatedPublisher(natsWrapper.client).publish({userId:userId})
    }
    catch (Exception) {
      console.log("generate-schedule: " + Exception)
      throw new BadRequestError("unable to generate recommendation");
    }
    console.log("userId published for generating schedule")
    res.status(200).send();
  }
);
export { router as generateSchedule };
