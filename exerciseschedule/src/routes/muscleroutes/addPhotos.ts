import express, { Request, Response } from "express";
import { ScheduleCreatedPublisher } from "../../events/publishers/muscle-created-publisher";

import { requireAuth } from "../../middlewares/require-auth";
import { Muscle } from "../../models/muscle";
import { natsWrapper } from "../../nats-wrapper";


const router = express.Router();
router.post(
  "/api/exerciseschedule/addPhotos",
  requireAuth,
  async (req: Request, res: Response) => {
    const m = new Muscle();
    
    const {  photos } = req.body;
    
    const userId = req.currentUser!.id;
    
    const muscle = await m.addPhotos(photos,userId);
    
    new ScheduleCreatedPublisher(natsWrapper.client).publish({
      event: "predict",
      userId: req.currentUser!.id,
    })
    res.status(200).send({ muscle });
  }
);
export { router as addPhotos };
