import express, { Request, Response } from "express";
import { body, param } from "express-validator";
import { BadRequestError } from "../errors/bad-request-error";
import { UnAuthorizedError } from "../errors/unAuthorized-errors";
import { UserInformtionPublisher } from "../events/publishers/user-information-publisher";
import { currentUser } from "../middlewares/current-user";
import { requireAuth } from "../middlewares/require-auth";

import { User } from "../models/user";
import { natsWrapper } from "../nats-wrapper";
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
    const data = req.body;
    console.log(data)
    
    try {
      new UserInformtionPublisher(natsWrapper.client).publish({userId:req.currentUser.id,object:data});
    }
    catch (Exception) {
      console.log("UserInformationPublisher Exception: " + Exception);
    }
    
   
    res.status(201).send();
  }
);
export { router as addUserInformation };
