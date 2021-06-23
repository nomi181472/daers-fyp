import express, { Request, Response } from "express";
import { body } from "express-validator";
import { BadRequestError } from "../../errors/bad-request-error";
import { requireAuth } from "../../middlewares/require-auth";
import { validateRequest } from "../../middlewares/validate-request";
import { ExerciseSchedule } from "../../models/Exercise-Schedule";

const router = express.Router();
router.post(
  "/api/exerciseschedule/newschedule",
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
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { document } = req.body;
    const sch = new ExerciseSchedule();
    const userId = req.currentUser!.id;
    const result = await sch.addSchedule({ document, userId });
    if (!result) {
      throw new BadRequestError("unAble to create schedule");
    }
    if (result == "schedule-Exist") {
      throw new BadRequestError("user cannot make more than one schedule please delete previous one");
    }
    
    res.status(201).send({ result });

  }
);

export { router as newSchedule };
