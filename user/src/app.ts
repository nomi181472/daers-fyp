import express from "express";
import "express-async-errors";
import cors from "cors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { currentUserRouter } from "./routes/current-user";
import { signInRouter } from "./routes/sign-in";
import { signOutRouter } from "./routes/sign-out";
import { signUpRouter } from "./routes/sign-up";
import { errorHandler } from "./middlewares/error-handler";
import { UnknownRouteError } from "./errors/unknown-Route-error";
import { addUserRouter } from "./routes/add";
import { deleteUserRouter } from "./routes/delete";
import { listUserRouter } from "./routes/list";
import { detailUserRouter } from "./routes/detail";
import { updateUserRouter } from "./routes/update";
import { addUserInformation } from "./routes/add-user-information";
import { getHeightAndWeight } from "./routes/get-Height-And-Weight";
import { addPhotos } from "./routes/addphotos";
//const route=require("./routing-policy");
//import axios from "axios";

const app = express();
const corsOptions = {
  origin:  ["http://localhost:3000","http://localhost:19006","http://localhost:3023"],
  optionsSuccessStatus: 200,
  credentials: true,
  exposedHeaders: "*",
};
app.use(cors(corsOptions));
app.use(json());
app.set("trust proxy", true);
app.use(cookieSession({ signed: false, httpOnly: false }));
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);
app.use(currentUserRouter);
app.use(addUserInformation);
app.use(deleteUserRouter);
app.use(listUserRouter);
app.use(detailUserRouter);
app.use(updateUserRouter);
app.use(getHeightAndWeight);
app.use(addPhotos);
app.all("*", async () => {
  throw new UnknownRouteError();
});
app.use(errorHandler);
export { app };
