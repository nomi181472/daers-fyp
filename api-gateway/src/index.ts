import express from "express";
import {json} from "body-parser"
import {currentUserRouter} from "./current-user";
import {signInRouter} from "./sign-in";
import {signOutRouter} from "./sign-out";
import {signUpRouter} from "./sign-up";
//const route=require("./routing-policy");
//import axios from "axios";
const app =express();

app.use(json());
app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);
//app.use("/",route);
app.listen(3000,()=>{
    console.log("api-gateway listening to port number 3000!!");
});

