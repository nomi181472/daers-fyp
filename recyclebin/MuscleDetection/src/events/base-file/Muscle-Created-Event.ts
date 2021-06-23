import { Subjects } from "./subject";
export interface MuscleCreatedEvents{
  subject: Subjects.UserPhotoAppear;
  data: {
    event:string,
    userId:string
  }
} 