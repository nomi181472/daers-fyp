import { Subjects } from "./subject";
export interface EScheduleCreatedEvent{
  subject: Subjects.ExerciseScheduleCreated;
  data: {
   work:string
  }
} 