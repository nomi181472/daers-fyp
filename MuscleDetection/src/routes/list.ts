import express, { Request, Response } from "express";
import { BadRequestError } from "../errors/bad-request-error";
import { requireAuth } from "../middlewares/require-auth";
import { Muscle } from "../models/muscle";

const router = express.Router();
router.get(
  "/api-gateway/current-user/muscle",
  //requireAuth,
  async (req: Request, res: Response) => {
    const ex = new Muscle();
    const { query } = req;
    const exercise = await ex.list(query);

    if (!exercise || exercise === "empty") {
      throw new BadRequestError("error while listing");
    }
    res.status(200).send({ exercise });
  }
);
export { router as listMuscleRouter };
