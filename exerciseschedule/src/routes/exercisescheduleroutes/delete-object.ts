import express, { Request, Response } from "express";
import { body, param } from "express-validator";
import { BadRequestError } from "../../errors/bad-request-error";
import { UnAuthorizedError } from "../../errors/unAuthorized-errors";
import { UnknownRouteError } from "../../errors/unknown-Route-error";
import { requireAuth } from "../../middlewares/require-auth";
import { validateRequest } from "../../middlewares/validate-request";
import { ExerciseSchedule } from "../../models/Exercise-Schedule";

const router = express.Router();
router.delete(
  "/api-gateway/current-user/schedulee/object/:id/:exerciseId/:date",
  requireAuth,
  [
    param("id")
      .isLength({ min: 24, max: 24 })
      .withMessage("Schedule id must be length 24"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const sch = new ExerciseSchedule();
    const date = req.params.date.slice(0, 4) +
     "-" + req.params.date.slice(4, 6) + "-" +
      req.params.date.slice(6);
    const schedule = await sch.deleteScheduleObject(
      req.params.id,
      req.currentUser!.id,
      req.params.exerciseId,
      date
    );
    if (schedule === "not-found") {
      throw new UnknownRouteError("scheduleid not found");
    }

    if (schedule === "required-authorization") {
      throw new UnAuthorizedError("required authorization");
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
