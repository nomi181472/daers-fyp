import express, { Request, Response } from "express";
import { body } from "express-validator";
import { BadRequestError } from "../errors/bad-request-error";
import { requireAuth } from "../middlewares/require-auth";
import { validateRequest } from "../middlewares/validate-request";
import { NutritionFactsSchedule } from "../models/NutritionFacts-Schedule";

const router = express.Router();
router.post(
  "/api/nutritionschedule",
  requireAuth,
  [
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
    const { document } = req.body;
    const sch = new NutritionFactsSchedule();
    const userId = req.currentUser!.id;
    const result = await sch.addSchedule({ document, userId });
    if (!result) {
      throw new BadRequestError("unAble to create schedule");
    }
    // let result = await exerciseScheduleModel.build({ document, userId });

    res.status(201).send({ result });
  }
);

export { router as newSchedule };
