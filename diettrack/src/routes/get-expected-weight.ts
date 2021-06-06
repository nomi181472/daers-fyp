
import express, { Request, Response }  from "express";
import { requireAuth } from "../middlewares/require-auth";
import {DietTrack} from "../models/diet-track";
import { BadRequestError } from '../errors/bad-request-error';
var router = express.Router();
router.get("/api-gateway/dietTrack/expectedWeight",
  requireAuth, async (req: Request, res: Response) => {
    try {
      const userId = req.currentUser!.id;
      const obj = new DietTrack();
      const result = await obj.getExpectedWeight(userId);
        
      if (result == undefined) {
        throw new BadRequestError("expectWeight is not Defined")
      }
      console.log(result);
      res.send(result);
    }
    catch (exception) {
      throw new BadRequestError("diet-track,get-expected-weight userId not found: "
      +exception)      
    }

      
  
});

export { router as getExpectedWeight };

