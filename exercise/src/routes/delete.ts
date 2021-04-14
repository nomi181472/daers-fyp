import express, { Request, Response } from "express";
import { param } from "express-validator";
import { BadRequestError } from "../errors/bad-request-error";
import { requireAuth } from "../middlewares/require-auth";
import { validateRequest } from "../middlewares/validate-request";
import { Exercise } from "../models/exercise";

const router = express.Router();
router.delete(
  "/api-gateway/current-user/exercise/:id",
  requireAuth,
  param("id")
    .isLength({ min: 24, max: 24 })
    .withMessage("Schedule id must be length 24"),
  validateRequest,
  async (req: Request, res: Response) => {
    const ex = new Exercise();
    const exericse = await ex.deleteExercise(req.params.id);
    if (exericse === "id-notfound") {
      throw new BadRequestError("id not found");
    }
    if (!exericse) {
      throw new BadRequestError("error while deleting");
    }
    res.sendStatus(200);
  }
);
export { router as deleteExerciseRouter };
