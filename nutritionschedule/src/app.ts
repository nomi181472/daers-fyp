import express from "express";
import "express-async-errors";
import cors from "cors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { errorHandler } from "./middlewares/error-handler";
import { UnknownRouteError } from "./errors/unknown-Route-error";
import { newSchedule } from "./routes/new-schedule";
import { currentUser } from "./middlewares/current-user";
import { getIdRouter } from "./routes/get-id";
import { listRouter } from "./routes/list";
import { updateRouter } from "./routes/update";
import { updateObjectRouter } from "./routes/update-object";
import { deleteRouter } from "./routes/delete";
import { deleteObjectRouter } from "./routes/delete-object";
import { getUserScheduleRouter } from "./routes/getuserschedule";
import { deleteDay } from "./routes/delete-day";
import { deleteDayTime } from "./routes/delete-day-time";
import { generateSchdule } from "./routes/generate-schedule";

const app = express();
const corsOptions = {
  origin:   ["http://localhost:3000","http://localhost:19006"],
  optionsSuccessStatus: 200,
  credentials: true,
  exposedHeaders: "*",
};

app.use(cors(corsOptions));

app.use(json());
app.set("trust proxy", true);
app.use(cookieSession({ signed: false, httpOnly: false }));
app.use(currentUser);
app.use(newSchedule);
app.use(getIdRouter);
app.use(listRouter);
app.use(getUserScheduleRouter);
app.use(updateRouter);
app.use(updateObjectRouter);
app.use(deleteRouter);
app.use(deleteObjectRouter);
app.use(deleteDay);
app.use(deleteDayTime);
app.use(generateSchdule);
app.all("*", async () => {
  throw new UnknownRouteError();
});
app.use(errorHandler);
export { app };
