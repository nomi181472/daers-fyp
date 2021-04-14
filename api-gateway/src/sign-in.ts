import express, {Response,Request} from "express";
const router=express.Router();
router.get("/api-gateway/sign-in/user",(req:Request,res:Response)=>{
    res.send({message:"sign-in"});
}); 
export {router as signInRouter};