import express, { Request, Response } from "express";
import { UnknownRouteError } from "../errors/unknown-Route-error";
import { exerciseScheduleModel } from "../models/exercise-schedule-repo/exercise-schedule-repo";
import { requireAuth } from "../middlewares/require-auth";
import { UnAuthorizedError } from "../errors/unAuthorized-errors";
import { ExerciseSchedule } from "../models/Exercise-Schedule";
import { BadRequestError } from "../errors/bad-request-error";
import { validateRequest } from "../middlewares/validate-request";
import { body, param } from "express-validator";
const router = express.Router();
router.delete(
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
    const sch = new ExerciseSchedule();
    const schedule = await sch.deleteScheduleObject(
      req.params.id,
      req.body,
      req.currentUser!.id,
      req.params.exerciseId
    );
    //const schedule = await exerciseScheduleModel.findById(req.params.id);
    // if (!schedule) {
    //   throw new UnknownRouteError("scheduleid not found");
    // }
    // if (req.currentUser!.id !== schedule!.userId) {
    //   throw new UnAuthorizedError("required authorization");
    // }
    // const dayR = req.body.document[0].sameDay;
    // //console.log(req.params.exerciseId);
    // const { document } = schedule;
    // let index: number = -1;
    // for (var i = 0; i < document.length; i++) {
    //   document[i].sameDay;
    //   if (dayR === document[i].sameDay) {
    //     index = i;
    //     // console.log(document[i]);
    //     break;
    //   }
    // }

    // if (index === -1) {
    //   throw new UnknownRouteError("day does not exist");
    // }
    // if (index >= 0) {
    //   let index2: number = -1;
    //   for (var i = 0; i < document[index].day.length; i++) {
    //     if (document[index].day[i].sameExercise === req.params.exerciseId) {
    //       index2 = i;
    //       break;
    //     }
    //   }
    //   const len = document[index].day.length;
    //   console.log(document[index].day.length);
    //   if (index2 >= 0) {
    //     schedule.document[index].day.splice(index2, 1);
    //     if (len <= 1) {
    //       schedule.document.splice(index, 1);
    //     }
    //   } else {
    //     throw new UnknownRouteError("exerciseid is not same");
    //   }
    // }
    // await schedule.save();
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
    res.sendStatus(200);
  }
);
export { router as deleteObjectRouter };
