import { Subjects } from "./subject";

export interface GeberateScheduleEvent {
  subject:Subjects.generateDietSchedule
  data: {
    userId:string
  }
  
}
