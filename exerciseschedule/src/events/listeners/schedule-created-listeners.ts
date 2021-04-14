import { Message } from "node-nats-streaming";
import { EScheduleCreatedEvent } from '../../../../sub/src/events/ESchedule-Created-Event';
import { Subjects } from '../../../../sub/src/events/subject';
import { Listener } from '../../../../sub/src/events/base-listener';
export class ScheduleCreatedListener extends Listener<EScheduleCreatedEvent>{
  queueGroupName = "user-management-service";
  subject: Subjects.ExerciseScheduleCreated = Subjects.ExerciseScheduleCreated;
  onMessage(data: EScheduleCreatedEvent["data"], msg: Message) {
    
  }
}