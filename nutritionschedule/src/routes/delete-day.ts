import express, { Request, Response } from "express";
import { requireAuth } from "../middlewares/require-auth";
import { param } from "express-validator";

import { validateRequest } from "../middlewares/validate-request";
import { BadRequestError } from "../errors/bad-request-error";
import { NutritionFactsSchedule } from "../models/NutritionFacts-Schedule";
const router = express.Router();
router.delete(
  "/api-gateway/current-user/schedulenf/day/:id/:day",
  requireAuth,
  [
    param("id")
      .isLength({ min: 24, max: 24 })
      .withMessage("Schedule id must be length 24"),
  ],

  validateRequest,
  async (req: Request, res: Response) => {
    const sch = new NutritionFactsSchedule();

    const day = req.params.day.slice(0, 4) +
     "-" + req.params.day.slice(4, 6) +
      "-" + req.params.day.slice(6);
    
    const schedule = await sch.deleteDay(
      req.params.id,
      day
    );
    if (!schedule) {
      throw new BadRequestError("Can't delete");
    }
    res.send(schedule);
  }
);
export { router as deleteDay };
