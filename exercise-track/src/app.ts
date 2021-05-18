import express from "express";
import "express-async-errors";
import cors from "cors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { errorHandler } from "./middlewares/error-handler";
import { UnknownRouteError } from "./errors/unknown-Route-error";
import { addWeightCapacity } from "./routes/addWeight";
import { currentUser } from "./middlewares/current-user";
import { listExercise } from "./routes/list";
import { addRunning } from "./routes/addrunning";
import { listRunningData } from "./routes/listrunning";


const app = express();
const corsOptions = {
  origin:  ["http://localhost:3000","http://localhost:19006","http://localhost:3023"],
  optionsSuccessStatus: 200,
  credentials: true,
  exposedHeaders: "*",
};

app.use(cors(corsOptions));;

app.use(json());
app.set("trust proxy", true);
app.use(cookieSession({ signed: false, httpOnly: false }));
app.use(currentUser);

app.use(addRunning);
app.use(listRunningData)
app.use(addWeightCapacity)
app.use(listExercise)

app.all("*", async () => {
  throw new UnknownRouteError();
});
app.use(errorHandler);
export { app };
