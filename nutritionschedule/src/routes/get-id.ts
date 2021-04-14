import express, { Request, Response } from "express";
import { UnknownRouteError } from "../errors/unknown-Route-error";
import { NutritionFactsSchedule } from "../models/NutritionFacts-Schedule";
import { requireAuth } from "../middlewares/require-auth";
import { BadRequestError } from "../errors/bad-request-error";
import { param } from "express-validator";
import { validateRequest } from "../middlewares/validate-request";
const router = express.Router();
router.get(
  "/api-gateway/current-user/schedulenf/:id",
  requireAuth,
  [
    param("id")
      .isLength({ min: 24, max: 24 })
      .withMessage("Schedule id must be length 24"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const sch = new NutritionFactsSchedule();
    const schedule = await sch.getScheduleId(req.params.id);

    if (!schedule) {
      throw new UnknownRouteError("scheduleid not found or error while get id");
    }
    res.send({ schedule });
  }
);
export { router as getIdRouter };
