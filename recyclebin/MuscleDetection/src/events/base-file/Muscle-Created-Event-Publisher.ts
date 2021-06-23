import { Publisher } from "./base-publisher";
import { MuscleCreatedEvents } from "./Muscle-Created-Event";
import { Subjects } from "./subject";




export class EScheduleCreatedPublisher extends Publisher<MuscleCreatedEvents>{
  subject: Subjects.UserPhotoAppear=Subjects.UserPhotoAppear;
  
}