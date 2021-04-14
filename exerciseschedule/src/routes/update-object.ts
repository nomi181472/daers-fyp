import express, { Request, Response } from "express";
import { UnknownRouteError } from "../errors/unknown-Route-error";
import { exerciseScheduleModel } from "../models/exercise-schedule-repo/exercise-schedule-repo";
import { UnAuthorizedError } from "../errors/unAuthorized-errors";
import { requireAuth } from "../middlewares/require-auth";
import { validateRequest } from "../middlewares/validate-request";
import { body, param } from "express-validator";
import { ExerciseSchedule } from "../models/Exercise-Schedule";
import { BadRequestError } from "../errors/bad-request-error";
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

    //const dayR = req.body.document[0].sameDay;
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
    //   throw new UnknownRouteError("not same day");
    // }
    // if (index >= 0) {
    //   let index2: number = -1;
    //   for (var i = 0; i < document[index].day.length; i++) {
    //     if (document[index].day[i].sameExercise === req.params.exerciseId) {
    //       index2 = i;
    //       break;
    //     }
    //   }

    //   if (index2 >= 0) {
    //     //console.log("yes");
    //     //console.log("before", document[index].day[index2]);
    //     schedule.document[index].day[index2] = req.body.document[0].day[0];
    //     //document[index].day[index2].sameExercise = req.body.document[0].day[0];
    //     // console.log(req.body.document[0].day[0]);
    //     // console.log(document[index].day[index2]);
    //   }

    //   //else {
    //   //   document[index].day.push(req.body.document[0].day[0]);
    //   //   console.log(document[index].day);
    //   // }
    //   // document[index].day.push(req.body.document[0].day[0]);
    //   //console.log(document[index].day);
    // }
    // await schedule.save();
    res.send(schedule);
  }
);
export { router as updateObjectRouter };
