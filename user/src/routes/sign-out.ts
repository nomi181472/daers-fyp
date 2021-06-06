import express, { Response, Request } from "express";
const router = express.Router();
router.post("/api-gateway/sign-out/user", (req: Request, res: Response) => {
  req.session = null;
  res.send({ message: "sign-out" });
});
export { router as signOutRouter };
