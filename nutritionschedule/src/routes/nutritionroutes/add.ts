import express, { Request, Response } from "express";
import { body } from "express-validator";
import { BadRequestError } from "../../errors/bad-request-error";
import { requireAuth } from "../../middlewares/require-auth";
import { validateRequest } from "../../middlewares/validate-request";
import { NutritionFacts } from "../../models/nutritionfacts";

const router = express.Router();
router.post(
  "/api-gateway/current-user/nutritionfact",

  requireAuth,
  body("nutritionCategory")
    .not()
    .isEmpty()
    .withMessage("nutritionCategory is required"),

  body("nutritionName")
    .not()
    .isEmpty()
    .withMessage("nutritionName is required"),
  body("fats").not().isEmpty().withMessage("fats is required"),
  //body("sugars").not().isEmpty().withMessage("sugars is required"),
  body("carbohydrates")
    .not()
    .isEmpty()
    .withMessage("carbohydrates is required"),
  //body("cholestrol").not().isEmpty().withMessage("cholestrol is required"),
  //body("fiber").not().isEmpty().withMessage("fiber is required"),
  body("calories").not().isEmpty().withMessage("calories is required"),
  body("protein").not().isEmpty().withMessage("protein is required"),

  validateRequest,
  async (req: Request, res: Response) => {
    const nt = new NutritionFacts();
    const nutrition = await nt.addNutritionFacts(req.body);
    if (!nutrition) {
      throw new BadRequestError("error while Adding");
    }
    res.status(201).send({ nutrition });
  }
);
export { router as addNutritionFactseRouter };
