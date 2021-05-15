import { Publisher } from "../base-file/base-publisher";
import { ScheduleGenerateEvent } from "../base-file/schedule-generate-event";
import { Subjects } from "../base-file/subject";


export class ScheduleCreatedPublisher extends Publisher<ScheduleGenerateEvent>{
  subject: Subjects.scheduleGenerate=Subjects.scheduleGenerate;

}

