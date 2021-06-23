import express, { Request, Response } from "express";
import { UnAuthorizedError } from "../../errors/unAuthorized-errors";
import { requireAuth } from "../../middlewares/require-auth";
import { Muscle } from "../../models/muscle";


const router = express.Router();
router.get(
  "/api/exerciseschedule/muscle/list",
  requireAuth,
  async (req: Request, res: Response) => {
    const ex = new Muscle();
    const userId = req.currentUser?.id;
    //const userId="606956f279de6e3c5c1d945d"
    
    if (userId) {
      const photos =await  ex.list(userId);
      //console.log(photos);
    
      res.status(200).send({photos});
    }
    else{
      throw new UnAuthorizedError("user id not found");
    }
  
  }
);
export { router as listMuscleRouter };
