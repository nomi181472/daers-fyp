import express from "express";
import "express-async-errors";
import cors from "cors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { errorHandler } from "./middlewares/error-handler";
import { UnknownRouteError } from "./errors/unknown-Route-error";
import { addExerciseRouter } from "./routes/exerciseroutes/add";
import { updateExerciseRouter } from "./routes/exerciseroutes/update";
import { detailExerciseRouter } from "./routes/exerciseroutes/detail";
import { deleteExerciseRouter } from "./routes/exerciseroutes/delete";
import { listExerciseRouter } from "./routes/exerciseroutes/list";
import { currentUser } from "./middlewares/current-user";
import { newSchedule } from "./routes/exercisescheduleroutes/new-schedule";
import { getIdRouter } from "./routes/exercisescheduleroutes/get-id";
import { listRouter } from "./routes/exercisescheduleroutes/list";
import { updateRouter } from "./routes/exercisescheduleroutes/update";
import { updateObjectRouter } from "./routes/exercisescheduleroutes/update-object";
import { deleteRouter } from "./routes/exercisescheduleroutes/delete";
import { deleteObjectRouter } from "./routes/exercisescheduleroutes/delete-object";
import { getUserScheduleRouter } from "./routes/exercisescheduleroutes/getuserschedule";
import { deleteDay } from "./routes/exercisescheduleroutes/delete-day";
import { generateSchedule } from "./routes/exercisescheduleroutes/generate-schedule";
const app = express();
const corsOptions = {
  origin:  ["http://localhost:3000","http://localhost:19006"],
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
app.use(updateRouter);
app.use(updateObjectRouter);
app.use(deleteRouter);
app.use(deleteObjectRouter);
app.use(getUserScheduleRouter);
app.use(deleteDay);
app.use(generateSchedule);
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
