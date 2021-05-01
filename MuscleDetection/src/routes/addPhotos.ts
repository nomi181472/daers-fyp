import express, { Request, Response } from "express";
import { requireAuth } from "../middlewares/require-auth";
import { Muscle } from "../models/muscle";
import { ScheduleCreatedPublisher } from '../events/publishers/muscle-created-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();
router.post(
  "/api-gateway/current-user/muscle/addPhotos",
  requireAuth,
  async (req: Request, res: Response) => {
    const m = new Muscle();
    
    const {  photos } = req.body;
    
    const userId = req.currentUser!.id;
    console.log("hit")
    const muscle = await m.addPhotos(photos,userId);
    
    new ScheduleCreatedPublisher(natsWrapper.client).publish({
      event: "predict",
      userId: req.currentUser!.id,
    })
    res.status(200).send({ muscle });
  }
);
export { router as addPhotos };
