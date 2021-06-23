import express, { Request, Response } from "express";
import { NutritionFactsSchedule } from "../models/NutritionFacts-Schedule";
import { requireAuth } from "../middlewares/require-auth";
import { BadRequestError } from "../errors/bad-request-error";
import { GenerateSchedulePublisher } from "../events/publishers/generate-schedule-publisher";
import { natsWrapper } from "../nats-wrapper";
const router = express.Router();
router.get(
  "/api/nutritionschedule/generateSchedule",
  requireAuth,
  async (req: Request, res: Response) => {
    const sch = new NutritionFactsSchedule();
    try {
      const userId=req.currentUser!.id
      new GenerateSchedulePublisher(natsWrapper.client).publish({userId})
    } catch (exception) {
      throw new BadRequestError("generate diet schedule"+exception);
    }
    res.status(200).send();
  }
);
export { router as generateSchdule };
