import express, { Request, Response } from "express";

import { UnknownRouteError } from "../errors/unknown-Route-error";
import { UnAuthorizedError } from "../errors/unAuthorized-errors";
import { body, param } from "express-validator";
import { requireAuth } from "../middlewares/require-auth";
import { NutritionFactsSchedule } from "../models/NutritionFacts-Schedule";
import { BadRequestError } from "../errors/bad-request-error";
import { validateRequest } from "../middlewares/validate-request";
const router = express.Router();
router.put(
  "/api-gateway/current-user/schedulenf/:id",
  requireAuth,
  [
    param("id")
      .isLength({ min: 24, max: 24 })
      .withMessage("Schedule id must be length 24"),

    body("document").not().isEmpty().withMessage("document is required"),
    body("document.*.sameDay").not().isEmpty().withMessage("Day is required"),
    body("document.*.day.*.time.*.nutrition")
      .not()
      .isEmpty()
      .withMessage("NutritionData is Required"),
    body("document.*.day.*.dayTime")
      .not()
      .isEmpty()
      .withMessage("DayTime is required"),
    body("document.*.day.*.time")
      .not()
      .isEmpty()
      .withMessage("time is required"),
    body("document.*.day.*.time.*.sameNutrition")
      .not()
      .isEmpty()
      .withMessage("nutritionId is required"),
  ],

  validateRequest,
  async (req: Request, res: Response) => {
    //const schedule = await exerciseScheduleModel.findById(req.params.id);
    const sch = new NutritionFactsSchedule();
    const schedule = await sch.updatechedule(
      req.params.id,
      req.currentUser!.id,
      req.body
    );

    if (schedule === "id-not-found") {
      throw new UnknownRouteError("scheduleid not found");
    }

    if (schedule === "required-authorization") {
      throw new UnAuthorizedError("required authorization");
    }
    if (!schedule) {
      throw new BadRequestError("error while updating");
    }

    res.sendStatus(200);
  }
);
export { router as updateRouter };
