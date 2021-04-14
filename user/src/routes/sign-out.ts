import express, { Response, Request } from "express";
const router = express.Router();
router.post("/api-gateway/sign-out/user", (req: Request, res: Response) => {
  // res = null;
  //req.session = null;
  // const { cookie } = req.headers;
  // if (cookie?.substring(4, cookie.length)) {
  //   //console.log(cookie?.substring(4, cookie.length));
  //   const token = cookie?.substring(4, cookie.length);
  //   res.clearCookie("jwt", token);
  // }
  req.session = null;
  res.send({ message: "sign-out" });
});
export { router as signOutRouter };
