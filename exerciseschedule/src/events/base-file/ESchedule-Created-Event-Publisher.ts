import { Publisher } from "./base-publisher";
import { EScheduleCreatedEvent } from "./ESchedule-Created-Event";
import { Subjects } from "./subject";




export class EScheduleCreatedPublisher extends Publisher<EScheduleCreatedEvent>{
  subject: Subjects.ExerciseScheduleCreated=Subjects.ExerciseScheduleCreated;
  
}