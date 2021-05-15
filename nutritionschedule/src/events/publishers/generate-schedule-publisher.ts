import { Publisher } from "../base-file/base-publisher";
import { GeberateScheduleEvent } from "../base-file/generate-schedule-event";

import { Subjects } from '../base-file/subject';


export class GenerateSchedulePublisher  extends Publisher<GeberateScheduleEvent>{
  subject: Subjects.generateDietSchedule=Subjects.generateDietSchedule;

}







  