import { Subjects } from "./subject";
export interface UserInformationEvent {
  subject: Subjects.UserInformation;
  data: {
    userId: string,
    weight:number,
    height:number,
    bmi:number,
    object:any
  }
} 