import { Subjects } from "./subject";
export interface UserInformationEvent {
  subject: Subjects.UserInformation;
  data: {
    object:any,
    userId: string;
    
  
  }
} 