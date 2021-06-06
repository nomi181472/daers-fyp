import express, { Request, Response } from "express";
import { UnknownRouteError } from "../errors/unknown-Route-error";
import { UnAuthorizedError } from "../errors/unAuthorized-errors";
import { body, param } from "express-validator";
import { requireAuth } from "../middlewares/require-auth";
import { ExerciseSchedule } from "../models/Exercise-Schedule";
import { BadRequestError } from "../errors/bad-request-error";
import { validateRequest } from "../middlewares/validate-request";
const router = express.Router();
router.put(
  "/api-gateway/current-user/schedulee/:id",
  requireAuth,
  [
    body("document").not().isEmpty().withMessage("document is required"),
    body("document.*.sameDay").not().isEmpty().withMessage("Day is required"),
    body("document.*.day.*.sameExercise")
      .not()
      .isEmpty()
      .withMessage("ExerciseID is required"),
    body("document.*.day.*.exercise.exerciseName")
      .not()
      .isEmpty()
      .withMessage("exerciseName is required"),
    body("document.*.day.*.exercise.sets")
      .not()
      .isEmpty()
      .withMessage("sets are required"),
    body("document.*.day.*.exercise.reps")
      .not()
      .isEmpty()
      .withMessage("reps is required"),
    param("id")
      .isLength({ min: 24, max: 24 })
      .withMessage("Schedule id must be length 24"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const sch = new ExerciseSchedule();
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
