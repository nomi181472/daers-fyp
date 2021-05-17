import express, { Response, Request } from "express";
//import jwt from "jsonwebtoken";
import { currentUser } from "../middlewares/current-user";
import { requireAuth } from "../middlewares/require-auth";

const router = express.Router();
router.get(
  "/api/user/current-user",
  currentUser,
  requireAuth,
  (req: Request, res: Response) => {
    /*const { cookie } = req.headers;
    if (cookie?.substring(4, cookie.length)) {
    //console.log(cookie?.substring(4, cookie.length));
    const token = cookie?.substring(4, cookie.length);
    try {
      const payload = jwt.verify(token, "noman"); //will be process.environment variable
      res.send({ currentUser: payload });
    } catch (err) {
      console.log(err);
      res.send({ currentUser: "not verified" });
    }
  }*/
    //res.send({ message: "currentUser" });
    /* if (!req.session?.headers) {
    //check if till session
    console.log(req.session);
    return res.send({ currentUser: null });
  }
  try {
    const payload = jwt.verify(req.session.jwt, "noman"); //will be process.environment variable
    res.send({ currentUser: payload });
  } catch (err) {
    console.log(err);
    res.send({ currentUser: "not verified" });
  }*/
    res.send({ currentUser: req.currentUser || null });
  }
);
export { router as currentUserRouter };
