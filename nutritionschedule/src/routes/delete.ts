import express, { Request, Response } from "express";
import { requireAuth } from "../middlewares/require-auth";
import { param } from "express-validator";
import { UnAuthorizedError } from "../errors/unAuthorized-errors";
import { validateRequest } from "../middlewares/validate-request";
import { BadRequestError } from "../errors/bad-request-error";
import { NutritionFactsSchedule } from "../models/NutritionFacts-Schedule";
const router = express.Router();
router.delete(
  "/api-gateway/current-user/schedulenf/:id",
  requireAuth,
  [
    param("id")
      .isLength({ min: 24, max: 24 })
      .withMessage("Schedule id must be length 24"),
  ],

  validateRequest,
  async (req: Request, res: Response) => {
    const sch = new NutritionFactsSchedule();
    const schedule = await sch.deleteSchedule(
      req.params.id,
      req.currentUser!.id
    );
    // const schedule = await exerciseScheduleModel.findById(req.params.id);
    if (schedule === "not-found") {
      throw new BadRequestError("SheduleId Not Found");
    }
    if (schedule === "required-authorization") {
      throw new UnAuthorizedError("required authorization");
    }
    if (!schedule) {
      throw new BadRequestError("error while deleting");
    }

    const { n, ok, deletedCount } = schedule;
    res.send({ n, ok, deletedCount });
  }
);
export { router as deleteRouter };
