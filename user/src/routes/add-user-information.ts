import express, { Request, Response } from "express";
import { body, param } from "express-validator";
import { BadRequestError } from "../errors/bad-request-error";
import { UnAuthorizedError } from "../errors/unAuthorized-errors";
import { currentUser } from "../middlewares/current-user";
import { requireAuth } from "../middlewares/require-auth";

import { User } from "../models/user";
const router = express.Router();
router.post(
  "/api-gateway/current-user/addUserInformation",
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    const u = new User();
   
    if (req.currentUser?.id) {
      const user = await u.addUserInformation(req.body, req.currentUser.id);
    }
    else {
      throw new UnAuthorizedError()
    }
    
   
    res.status(201).send();
  }
);
export { router as addUserInformation };
