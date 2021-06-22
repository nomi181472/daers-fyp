import express, { Request, Response } from "express";
import { BadRequestError } from "../../errors/bad-request-error";
import { requireAuth } from "../../middlewares/require-auth";
import { validateRequest } from "../../middlewares/validate-request";
import { Exercise } from "../../models/exercise";

const router = express.Router();
router.get(
  "/api-gateway/current-user/exercise",
  //requireAuth,
  async (req: Request, res: Response) => {
    const ex = new Exercise();
    const { query } = req;
    const exercise = await ex.listExercise(query);

    if (!exercise || exercise === "empty") {
      throw new BadRequestError("error while listing");
    }
    res.status(200).send({ exercise });
  }
);
export { router as listExerciseRouter };
