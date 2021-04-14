import express, { Request, Response } from "express";
import { NutritionFactsSchedule } from "../models/NutritionFacts-Schedule";
import { requireAuth } from "../middlewares/require-auth";
import { BadRequestError } from "../errors/bad-request-error";
import { param } from "express-validator";
import { validateRequest } from "../middlewares/validate-request";
import { UnknownRouteError } from "../errors/unknown-Route-error";
const router = express.Router();
router.get(
  "/api-gateway/current-user/schedulenf-user/getschedule",
  requireAuth,
  async (req: Request, res: Response) => {
    const sch = new NutritionFactsSchedule();
     const schedule = await sch.getUserScheduleId(req.currentUser!.id);

     if (schedule==="not-found") {
      throw new UnknownRouteError("scheduleid not found ");
    }
    
    res.status(200).send( {schedulenf:schedule} );
  }
);
export { router as getUserScheduleRouter };
