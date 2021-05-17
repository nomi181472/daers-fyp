import express, { Response, Request } from "express";
const router = express.Router();
router.post("/api/user/sign-out", (req: Request, res: Response) => {
  req.session = null;
  res.send({ message: "sign-out" });
});
export { router as signOutRouter };
