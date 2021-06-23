import express, { Response, Request } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { Password } from "../models/user-repo/password";
import { UserSchema } from "../models/user-repo/user-repo";
import { validateRequest } from "../middlewares/validate-request";
import { BadRequestError } from "../errors/bad-request-error";
import { currentUser } from "../middlewares/current-user";
const router = express.Router();
router.post(
  "/api/user/signin",
  [
    body("email").isEmail().withMessage("email must be valid"),
    body("password").trim().notEmpty().withMessage("password must enter"),
  ],
  validateRequest,
  currentUser,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const isUserExist = await UserSchema.findOne({ email });
    if (!isUserExist) {
      throw new BadRequestError("invalid email or password");
    }
    const isPasswordMatch = await Password.compare(
      isUserExist.password,
      password
    );
    if (!isPasswordMatch) {
      throw new BadRequestError("invalid email or password");
    }
    //generate jwt
    const userJWT = jwt.sign(
      {
        id: isUserExist.id,
        email: isUserExist.email,
      },
      "noman"
    );
    // store it on session object
    //console.log(userJWT);
    //req.session = { jwtt: userJWT };
    //console.log(req.session.jwtt);
    //res.cookie("jwt", userJWT);
    //console.log(req.currentUser);
    req.session!.jwt = userJWT;
    res.status(200).send({ isUserExist });
  }
);
export { router as signInRouter };
