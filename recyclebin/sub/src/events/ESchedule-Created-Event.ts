import { Subjects } from "./subject";
export interface EScheduleCreatedEvent{
  subject: Subjects.UserCreated;
  data: {
    event:string,
    userId:string
  
  }
} 