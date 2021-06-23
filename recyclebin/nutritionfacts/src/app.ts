import express from "express";
import "express-async-errors";
import cors from "cors";
import { json } from "body-parser";

import cookieSession from "cookie-session";

import { errorHandler } from "./middlewares/error-handler";
import { UnknownRouteError } from "./errors/unknown-Route-error";
import { currentUser } from "./middlewares/current-user";
import { addNutritionFactseRouter } from "./routes/add";
import { updateNutritionRouter } from "./routes/update";
import { detailNutritionFactRouter } from "./routes/detail";
import { deleteNutritionFactsRouter } from "./routes/delete";
import { listNutritionFactsRouter } from "./routes/list";
//const route=require("./routing-policy");
//import axios from "axios";

const app = express();
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
  credentials: true,
  exposedHeaders: "*",
};

app.use(cors(corsOptions));

app.use(json());
app.set("trust proxy", true);
app.use(cookieSession({ signed: false, httpOnly: false }));
app.use(currentUser);
app.use(addNutritionFactseRouter);
app.use(updateNutritionRouter);
app.use(detailNutritionFactRouter);
app.use(deleteNutritionFactsRouter);
app.use(listNutritionFactsRouter);

app.all("*", async () => {
  throw new UnknownRouteError();
});
app.use(errorHandler);
export { app };
