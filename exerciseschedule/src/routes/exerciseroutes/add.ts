import express, { Request, Response } from "express";
import { body, param } from "express-validator";
import { BadRequestError } from "../../errors/bad-request-error";
import { requireAuth } from "../../middlewares/require-auth";
import { validateRequest } from "../../middlewares/validate-request";
import { Exercise } from "../../models/exercise";


const router = express.Router();
router.post(
  "/api-gateway/current-user/exercise",
  requireAuth,
  [body("exerciseCategory")
    .not()
    .isEmpty()
    .withMessage("exerciseCategory is required"),
  body("exerciseName").not().isEmpty().withMessage("exerciseName is required"),
  body("level").not().isEmpty().withMessage("level is required"),
  body("type").not().isEmpty().withMessage("type is required"),
  body("modality").not().isEmpty().withMessage("modality is required"),
  body("joint").not().isEmpty().withMessage("joint is required"),
  body("direction").not().isEmpty().withMessage("direction is required"),
],
  validateRequest,
  async (req: Request, res: Response) => {
    const ex = new Exercise();
    const exericse = await ex.addExercise(req.body);
    if (!exericse) {
      throw new BadRequestError("error while Adding");
    }
    res.status(201).send({ exericse });
  }
);
export { router as addExerciseRouter };
