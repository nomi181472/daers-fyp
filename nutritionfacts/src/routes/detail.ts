import express, { Request, Response } from "express";
import { param } from "express-validator";
import { BadRequestError } from "../errors/bad-request-error";
import { requireAuth } from "../middlewares/require-auth";
import { validateRequest } from "../middlewares/validate-request";
import { NutritionFacts } from "../models/nutritionfacts";

const router = express.Router();
router.get(
  "/api-gateway/current-user/nutritionfact/:id",
  requireAuth,
  param("id")
    .isLength({ min: 24, max: 24 })
    .withMessage("Schedule id must be length 24"),
  validateRequest,
  async (req: Request, res: Response) => {
    const nt = new NutritionFacts();
    const nutrition = await nt.detailNutrition(req.params.id);
    if (nutrition === "id-notfound") {
      throw new BadRequestError("id not found");
    }
    if (!nutrition) {
      throw new BadRequestError("error while getting details");
    }
    res.status(200).send(nutrition);
  }
);
export { router as detailNutritionFactRouter };
