import express from "express";
import "express-async-errors";
import cors from "cors";
import { json } from "body-parser";

import cookieSession from "cookie-session";

import { errorHandler } from "./middlewares/error-handler";
import { UnknownRouteError } from "./errors/unknown-Route-error";
import { currentUser } from "./middlewares/current-user";
import { listMuscleRouter } from "./routes/list";
import { addPhotos } from "./routes/addPhotos";
//const route=require("./routing-policy");
//import axios from "axios";

const app = express();
const corsOptions = {
  origin: ["http://localhost:3000","http://localhost:19006"],
  optionsSuccessStatus: 200,
  credentials: true,
  exposedHeaders: "*",
};

app.use(cors(corsOptions));

app.use(json());
app.set("trust proxy", true);
app.use(cookieSession({ signed: false, httpOnly: false }));
app.use(currentUser);
app.use(addPhotos);
app.use(listMuscleRouter);

app.all("*", async () => {
  throw new UnknownRouteError();
});
app.use(errorHandler);
export { app };
