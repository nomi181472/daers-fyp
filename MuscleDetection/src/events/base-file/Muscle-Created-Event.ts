import { Subjects } from "./subject";
export interface EScheduleCreatedEvent{
  subject: Subjects.ExerciseScheduleCreated;
  data: {
    id: string;
    title: string;
    price: number;
  }
} 