import express, { Request, Response } from "express";
import { requireAuth } from "../middlewares/require-auth";
import { BadRequestError } from "../errors/bad-request-error";
import { natsWrapper } from "../nats-wrapper";
import { ScheduleCreatedPublisher } from "../events/publishers/schedule-generate-publisher";

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
