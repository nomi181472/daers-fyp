import express, { Request, Response } from "express";
import { body, param } from "express-validator";
import { BadRequestError } from "../../errors/bad-request-error";
import { requireAuth } from "../../middlewares/require-auth";
import { validateRequest } from "../../middlewares/validate-request";
import { Exercise } from "../../models/exercise";

const router = express.Router();
router.put(
  "/api-gateway/current-user/exercise/:id",
  requireAuth,
  param("id")
    .isLength({ min: 24, max: 24 })
    .withMessage("Schedule id must be length 24"),
  body("exerciseCategory")
    .not()
    .isEmpty()
    .withMessage("exerciseCategory is required"),
  body("exerciseName").not().isEmpty().withMessage("exerciseName is required"),
  body("level").not().isEmpty().withMessage("level is required"),
  body("type").not().isEmpty().withMessage("type is required"),
  body("modality").not().isEmpty().withMessage("modality is required"),
  body("joint").not().isEmpty().withMessage("joint is required"),
  body("direction").not().isEmpty().withMessage("direction is required"),
  validateRequest,
  async (req: Request, res: Response) => {
    const ex = new Exercise();
    const exericse = await ex.updateExercise(req.body, req.params.id);
    if (exericse === "id-notfound") {
      throw new BadRequestError("id not found");
    }
    if (!exericse) {
      throw new BadRequestError("error while updating");
    }
    res.status(201).send({ exericse });
  }
);
export { router as updateExerciseRouter };
