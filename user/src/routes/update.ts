import express, { Request, Response } from "express";
import { body, param } from "express-validator";
import { BadRequestError } from "../errors/bad-request-error";
import { currentUser } from "../middlewares/current-user";
import { requireAuth } from "../middlewares/require-auth";
import { validateRequest } from "../middlewares/validate-request";
import { User } from "../models/user";

const router = express.Router();
router.put(
  "/api/user/current-user/:id",
  currentUser,
  requireAuth,
  param("id")
    .isLength({ min: 24, max: 24 })
    .withMessage("Schedule id must be length 24"),
  // body("exerciseCategory")
  //   .not()
  //   .isEmpty()
  //   .withMessage("exerciseCategory is required"),
 

  validateRequest,
  async (req: Request, res: Response) => {
    const ex = new User();
    const user = await ex.updateUser(req.body, req.params.id);
    if (user === "id-notfound") {
      throw new BadRequestError("id not found");
    }
    if (!user) {
      throw new BadRequestError("error while updating");
    }
    res.status(201).send({ user });
  }
);
export { router as updateUserRouter };
