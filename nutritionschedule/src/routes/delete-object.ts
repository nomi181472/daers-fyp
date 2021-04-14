import express, { Request, Response } from "express";
import { UnknownRouteError } from "../errors/unknown-Route-error";
import { requireAuth } from "../middlewares/require-auth";
import { UnAuthorizedError } from "../errors/unAuthorized-errors";
import { NutritionFactsSchedule } from "../models/NutritionFacts-Schedule";
import { BadRequestError } from "../errors/bad-request-error";
import { validateRequest } from "../middlewares/validate-request";
import { body, param } from "express-validator";
const router = express.Router();
router.delete(
  "/api-gateway/current-user/schedulenf/object/:id/:nutritionId/:date/:time",
  requireAuth,
  [
    param("id")
      .isLength({ min: 24, max: 24 })
      .withMessage("Schedule id must be length 24"),

    
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const sch = new NutritionFactsSchedule();
    const date = req.params.date.slice(0, 4) + "-" + req.params.date.slice(4, 6) + "-" + req.params.date.slice(6);
    const schedule = await sch.deleteScheduleObject(
     req.params.id,
      req.currentUser!.id,
      req.params.nutritionId,
      date,
      req.params.time
    );

    if (schedule === "not-found") {
      throw new UnknownRouteError("scheduleid not found");
    }

    if (schedule === "required-authorization") {
      throw new UnAuthorizedError("required authorization");
    }
    if (schedule === "Date-Not-Found") {
      throw new UnknownRouteError("Date-Not-Found");
    }
    if (schedule === "DayTime-Not-Found") {
      throw new BadRequestError("DayTime-Not-Found");
    }
    if (schedule === "nutritionId-notFound") {
      throw new BadRequestError("nutritionId Not Found");
    }

    if (!schedule) {
      throw new BadRequestError("error while updating the object");
    }
    res.sendStatus(200);
  }
);
export { router as deleteObjectRouter };
