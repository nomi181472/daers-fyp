import { Message } from "node-nats-streaming";
import { ExerciseTrack } from "../../models/exercise-track";
import { Listener } from "../base-file/base-listener";
import { Subjects } from "../base-file/subject";
import { UserWeightEvent } from '../base-file/User-Weight-Event';
export class UserWeightListener extends Listener<UserWeightEvent>{
  queueGroupName = "user--exercise-track-Weight";
  subject: Subjects.userWeight = Subjects.userWeight ;
  onMessage(data: UserWeightEvent["data"], msg: Message) {
    console.log(data);
    const et = new ExerciseTrack()
    try {
      et.makeObject(data.userId, data.weight)
      msg.ack();
    }
    catch (Exception) {
      console.log("user weight listener: ", Exception)
      msg.ack();
    }
    
   
  }
}