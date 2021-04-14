import express, { Request, Response } from "express";
import { NutritionFactsSchedule } from "../models/NutritionFacts-Schedule";
import { BadRequestError } from "../errors/bad-request-error";

const router = express.Router();
router.get(
  "/api-gateway/current-user/schedulenf",
  async (req: Request, res: Response) => {
    const sch = new NutritionFactsSchedule();
    const schedule = await sch.listSchedules();
    if (!schedule) {
      throw new BadRequestError("error while listing");
    }
    res.send({schedulenf:schedule});
  }
);
export { router as listRouter };
