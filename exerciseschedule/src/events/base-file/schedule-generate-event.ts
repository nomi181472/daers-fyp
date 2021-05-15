import { Subjects } from "./subject";
export interface ScheduleGenerateEvent{
  subject: Subjects.scheduleGenerate;
  data: {
   userId:string
  }
} 