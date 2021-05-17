import express, { Response, Request } from "express";
import { body } from "express-validator";

import jwt from "jsonwebtoken";
import { validateRequest } from "../middlewares/validate-request";
import { BadRequestError } from "../errors/bad-request-error";
import { UserSchema } from "../models/user-repo/user-repo";
import { UserCreatedPublisher } from "../events/publishers/user-created-publisher";
import { natsWrapper } from "../nats-wrapper";
import { UserWeightPublisher } from "../events/publishers/user-weight-publisher";

const router = express.Router();
router.post(
  "/api/user/sign-up",
  [
    body("email").isEmail().withMessage("Email is not valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("passowrd must be greaer than 4"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const {
      email,
      password,
      age,
      weight,
      firstName,
      lastName,
      height,
      bmi,
      services
    } = req.body;

    const existingUser = await UserSchema.findOne({ email });
    if (existingUser) {
      throw new BadRequestError("email already in used");
    }
    
    const createdUser = UserSchema.build({
      email,
      password,
      age,
      weight,
      firstName,
      lastName,
      height,
      bmi,
      services
    });
    await createdUser.save();

    const userJWT = jwt.sign(
      {
        id: createdUser.id,
        email: createdUser.email,
      },
      "noman"
    );
    const userId = createdUser.id;
    
    req.session!.jwt = userJWT;
    try {
      new UserCreatedPublisher(natsWrapper.client).publish({ age, bmi, userId, })
    }
    catch (Exception) {
      console.log("UserCreatedPublisher Exception: "+Exception)
    }
    try {
      new UserWeightPublisher(natsWrapper.client).publish({ weight ,userId, })
    }
    catch (Exception) {
      console.log("UserCreatedPublisher Exception: "+Exception)
    }


    console.log("Returned");
    res.status(201).send({ createdUser });
  }
);
export { router as signUpRouter };
