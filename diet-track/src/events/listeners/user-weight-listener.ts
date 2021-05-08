import { Message } from "node-nats-streaming";
import { DietTrack } from "../../models/diet-track";

import { Listener } from "../base-file/base-listener";
import { Subjects } from "../base-file/subject";
import { UserWeightEvent } from '../base-file/User-Weight-Event';
export class UserWeightListener extends Listener<UserWeightEvent>{
  queueGroupName = "user--diet-track-Weight";
  subject: Subjects.userWeight = Subjects.userWeight ;
  onMessage(data: UserWeightEvent["data"], msg: Message) {
    console.log(data);
    const dt = new DietTrack()
    try {
      dt.makeObject(data.userId, data.weight)
      msg.ack();
    }
    catch (Exception) {
      console.log("user weight listener: ", Exception)
      msg.ack();
    }
    
   
  }
}