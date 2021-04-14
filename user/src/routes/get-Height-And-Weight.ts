import express, { Request, Response } from "express";
import { BadRequestError } from "../errors/bad-request-error";
import { currentUser } from "../middlewares/current-user";
import { requireAuth } from "../middlewares/require-auth";
import { User } from "../models/user";

const router = express.Router();
router.get(
  "/api-gateway/current-user/weightAndHeight",
  currentUser,
  requireAuth,
  
  async (req: Request, res: Response) => {
    const u = new User();
    let user: any;
    console.log("run");
    if(req.currentUser?.id)
     user= await u.getHeightAndWeight(req.currentUser?.id);
    
    if (!user || user === "empty") {
      throw new BadRequestError("error while listing");
    }
   
    res.status(200).send({ user });
  }
);
export { router as getHeightAndWeight };
