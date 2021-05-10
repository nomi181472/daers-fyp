import { Message } from "node-nats-streaming";

import { Listener } from "../base-file/base-listener";
import { Subjects } from "../base-file/subject";
import { EScheduleCreatedEvent } from '../base-file/ESchedule-Created-Event';
export class UserCreatedListener extends Listener<EScheduleCreatedEvent>{
  queueGroupName = "differentquesgrods";
  subject: Subjects.UserUpdated = Subjects.UserUpdated;
  onMessage(data: EScheduleCreatedEvent["data"], msg: Message) {
    console.log(data);
    
    msg.ack();
    for(var i=0;i<10;i++)
    {
      console.log(i)
    }
  }
}