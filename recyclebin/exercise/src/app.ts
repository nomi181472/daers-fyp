import express from "express";
import "express-async-errors";
import cors from "cors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { errorHandler } from "./middlewares/error-handler";
import { UnknownRouteError } from "./errors/unknown-Route-error";
import { currentUser } from "./middlewares/current-user";
import { addExerciseRouter } from "./routes/add";
import { updateExerciseRouter } from "./routes/update";
import { detailExerciseRouter } from "./routes/detail";
import { deleteExerciseRouter } from "./routes/delete";
import { listExerciseRouter } from "./routes/list";
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
app.use(addExerciseRouter);
app.use(updateExerciseRouter);
app.use(detailExerciseRouter);
app.use(deleteExerciseRouter);
app.use(listExerciseRouter);

app.all("*", async () => {
  throw new UnknownRouteError();
});
app.use(errorHandler);
export { app };
