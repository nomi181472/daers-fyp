import { Publisher } from "../base-file/base-publisher";
import { MuscleCreatedEvents } from "../base-file/Muscle-Created-Event";
import { Subjects } from "../base-file/subject";


export class ScheduleCreatedPublisher extends Publisher<MuscleCreatedEvents>{
  subject: Subjects.UserPhotoAppear =Subjects.UserPhotoAppear;

}

