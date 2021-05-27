import express, { Request, Response } from "express";
import { BadRequestError } from "../errors/bad-request-error";
import { requireAuth } from "../middlewares/require-auth";
import { NutritionFacts } from "../models/nutritionfacts";

const router = express.Router();
router.get(
  "/api/nutritionfacts",
  
  async (req: Request, res: Response) => {
    const nt = new NutritionFacts();
    const { query } = req;
    const nutrition = await nt.listNutritionFacts(query);

    if (!nutrition || nutrition === "empty") {
      throw new BadRequestError("error while listing");
    }
    res.status(200).send({ nutrition });
  }
);
export { router as listNutritionFactsRouter };
