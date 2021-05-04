import express, { Request, Response } from "express";
import { body } from "express-validator";
import { BadRequestError } from "../errors/bad-request-error";
import { ScheduleCreatedPublisher } from "../events/publishers/schedule-created-publisher";
import { requireAuth } from "../middlewares/require-auth";
import { validateRequest } from "../middlewares/validate-request";
import { ExerciseSchedule } from "../models/Exercise-Schedule";
import { natsWrapper } from "../nats-wrapper";
const router = express.Router();
router.post(
  "/api-gateway/current-user/exerciseschedule",
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
    console.log("i am here 43 line")
    // new ScheduleCreatedPublisher(natsWrapper.client).publish({
    //   age:23,
    //   bmi: 23,
    // weight: 23,
    //   height: 23,
    //   userId: "23",
    // })
    console.log("Returned");
    res.status(201).send({ result });

  }
);

export { router as newSchedule };
