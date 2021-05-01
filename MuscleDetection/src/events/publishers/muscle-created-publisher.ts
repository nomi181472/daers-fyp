import { Publisher } from '../../../../sub/src/events/base-publisher';
import { EScheduleCreatedEvent } from '../../../../sub/src/events/ESchedule-Created-Event';
import { Subjects } from '../../../../sub/src/events/subject';


export class ScheduleCreatedPublisher extends Publisher<EScheduleCreatedEvent>{
  subject: Subjects.UserCreated =Subjects.UserCreated;

}

