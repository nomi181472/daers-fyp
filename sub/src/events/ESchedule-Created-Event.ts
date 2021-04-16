import { Subjects } from "./subject";
export interface EScheduleCreatedEvent{
  subject: Subjects.ExerciseScheduleCreated;
  data: {
    event: string
    userId: string
 
  }
} 