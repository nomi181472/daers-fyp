import express, { Request, Response } from "express";
import { param } from "express-validator";
import { BadRequestError } from "../errors/bad-request-error";
import { currentUser } from "../middlewares/current-user";
import { requireAuth } from "../middlewares/require-auth";
import { validateRequest } from "../middlewares/validate-request";
import { User } from "../models/user";
import mongoose from 'mongoose';

const router = express.Router();
router.get(
  "/api-gateway/current-user/user/:id",
  currentUser,
  requireAuth,
  [
  param("id")
    .not()
    .isEmpty()
      .withMessage("User id must be length 24"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const u = new User();
    const user = await u.detailUser(req.params.id);
    if (user === "id-notfound") {
      throw new BadRequestError("id not found");
    }
    if (!user) {
      throw new BadRequestError("error while getting details");
    }
    res.status(200).send(user);
  }
);
export { router as detailUserRouter };
