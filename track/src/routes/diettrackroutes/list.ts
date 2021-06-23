import express, { Request, Response }  from "express";
import { BadRequestError } from "../../errors/bad-request-error";
import { requireAuth } from "../../middlewares/require-auth";
import { DietTrack } from "../../models/diet-track";
var router = express.Router();
router.get("/api/track/diettrack",
requireAuth, async (req: Request, res: Response) => {
  const obj = new DietTrack();
  const result=await obj.getAllData( req.currentUser!.id);
  console.log(result);
  res.send(result);
});
export { router as listDiet };
