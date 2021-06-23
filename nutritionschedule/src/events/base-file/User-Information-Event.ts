import { Subjects } from "./subject";
export interface UserInformationEvent {
  subject: Subjects.UserInformation;
  data: {
    userId: string,
    object: any,

  }
} 