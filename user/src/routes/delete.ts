import express, { Request, Response } from "express";
import { param } from "express-validator";
import { BadRequestError } from "../errors/bad-request-error";
import { currentUser } from "../middlewares/current-user";
import { requireAuth } from "../middlewares/require-auth";
import { validateRequest } from "../middlewares/validate-request";
import { User } from "../models/user";

const router = express.Router();
router.delete(
  "/api-gateway/current-user/user/:id",
  currentUser,
  requireAuth,
  param("id")
    .isLength({ min: 24, max: 24 })
    .withMessage("Schedule id must be length 24"),
  validateRequest,
  async (req: Request, res: Response) => {
    const ex = new User();
    const u = await ex.deleteUser(req.params.id);
    if (u === "id-notfound") {
      throw new BadRequestError("id not found");
    }
    if (!u) {
      throw new BadRequestError("error while deleting");
    }
    res.sendStatus(200);
  }
);
export { router as deleteUserRouter };
