import { Message } from "node-nats-streaming";

import { Listener } from "../base-file/base-listener";
import { Subjects } from "../base-file/subject";
import { UserCreatedEvent } from "../base-file/User-Created-Event";
export class ScheduleCreatedListener extends Listener<UserCreatedEvent>{
  queueGroupName = "user-management-service";
  subject: Subjects.UserCreated = Subjects.UserCreated;
  onMessage(data: UserCreatedEvent["data"], msg: Message) {
    console.log(data);
    msg.ack();
    for(var i=0;i<10;i++)
    {
      console.log(i)
    }
  }
}