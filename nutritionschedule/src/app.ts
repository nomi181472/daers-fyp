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
import { addNutritionFactseRouter } from "./routes/nutritionroutes/add";
import { updateNutritionRouter } from "./routes/nutritionroutes/update";
import { detailNutritionFactRouter } from "./routes/nutritionroutes/detail";
import { deleteNutritionFactsRouter } from "./routes/nutritionroutes/delete";
import { listNutritionFactsRouter } from "./routes/nutritionroutes/list";
import { sortRouter } from "./routes/nutritionreminderroutes/sort";
import { countRouter } from "./routes/nutritionreminderroutes/count";
import { reScheduleRouter } from "./routes/nutritionreminderroutes/reschedule";

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
app.use(addNutritionFactseRouter);
app.use(updateNutritionRouter);
app.use(detailNutritionFactRouter);
app.use(deleteNutritionFactsRouter);
app.use(listNutritionFactsRouter);
app.use(sortRouter);
app.use(countRouter)
app.use(reScheduleRouter);
app.all("*", async () => {
  throw new UnknownRouteError();
});
app.use(errorHandler);
export { app };
