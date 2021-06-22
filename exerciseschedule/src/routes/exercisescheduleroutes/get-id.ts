import express, { Request, Response } from "express";
import { body, param } from "express-validator";
import { BadRequestError } from "../../errors/bad-request-error";
import { UnAuthorizedError } from "../../errors/unAuthorized-errors";
import { UnknownRouteError } from "../../errors/unknown-Route-error";
import { requireAuth } from "../../middlewares/require-auth";
import { validateRequest } from "../../middlewares/validate-request";
import { ExerciseSchedule } from "../../models/Exercise-Schedule";
const router = express.Router();
router.get(
  "/api-gateway/current-user/schedulee/:id",
  requireAuth,
  async (req: Request, res: Response) => {
    const sch = new ExerciseSchedule();
    const schedule = await sch.getScheduleId(req.params.id);

    if (!schedule) {
      throw new UnknownRouteError("scheduleid not found or error while get id");
    }
    res.send({ schedule });
  }
);
export { router as getIdRouter };
