import express, { Request, Response } from "express";
import { body, param } from "express-validator";
import { BadRequestError } from "../../errors/bad-request-error";
import { UnAuthorizedError } from "../../errors/unAuthorized-errors";
import { UnknownRouteError } from "../../errors/unknown-Route-error";
import { requireAuth } from "../../middlewares/require-auth";
import { validateRequest } from "../../middlewares/validate-request";
import { ExerciseSchedule } from "../../models/Exercise-Schedule";
const router = express.Router();
router.put(
  "/api-gateway/current-user/schedulee/object/:id/:exerciseId",
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
    // const schedule = await exerciseScheduleModel.findById(req.params.id);
    const sch = new ExerciseSchedule();
    const schedule = await sch.updateScheduleObject(
      req.params.id,
      req.body,
      req.params.exerciseId,
      req.currentUser!.id
    );
    if (schedule === "not-found") {
      throw new UnknownRouteError("scheduleid not found");
    }

    if (schedule === "required-authorization") {
      throw new UnAuthorizedError("required authorization");
    }
    if (schedule === "not-same-day") {
      throw new UnknownRouteError("not a same day");
    }
    if (schedule === "exerciseId-notFound") {
      throw new BadRequestError("exerciseId Not Found");
    }

    if (!schedule) {
      throw new BadRequestError("error while updating the object");
    }
    res.send(schedule);
  }
);
export { router as updateObjectRouter };
