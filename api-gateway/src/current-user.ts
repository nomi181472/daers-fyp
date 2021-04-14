import express, {Response,Request} from "express";
const router=express.Router();
router.get("/api-gateway/current-user/user",(req:Request,res:Response)=>{
    res.send({message:"currentUser"});
}); 
export {router as currentUserRouter};