import express, { Request, Response } from "express";
import { body, param } from "express-validator";
import { BadRequestError } from "../errors/bad-request-error";
import { currentUser } from "../middlewares/current-user";
import { requireAuth } from "../middlewares/require-auth";
import { validateRequest } from "../middlewares/validate-request";
import { User } from "../models/user";
const router = express.Router();
router.post(
  "/api-gateway/current-user/adduser",
  currentUser,
  requireAuth,
  [body("email").isEmail().withMessage("Email is not valid"),
  body("password")
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("passowrd must be greaer than 4")],

  validateRequest,
  async (req: Request, res: Response) => {
    const u = new User();
    console.log(req);
    const user = await u.addUser(req.body);
    if (!user) {
      throw new BadRequestError("error while Adding");
    }
    res.status(201).send({ user });
  }
);
export { router as addUserRouter };
