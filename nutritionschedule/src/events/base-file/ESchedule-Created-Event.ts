import { Subjects } from "./subject";
export interface EScheduleCreatedEvent{
  subject: Subjects.UserUpdated;
  data: {
    id: string;
    title: string;
    price: number;
  }
} 