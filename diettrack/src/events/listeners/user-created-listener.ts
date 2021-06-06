import { Message } from "node-nats-streaming";
import { DietTrack } from "../../models/diet-track";
import { UserSchema } from "../../models/diet-track-repo/user-diet-repo";

import { Listener } from "../base-file/base-listener";
import { Subjects } from "../base-file/subject";
import { UserCreatedEvent } from '../base-file/User-Weight-Event';
import mongoose from 'mongoose';
export class UserCreatedListener extends Listener<UserCreatedEvent>{
  queueGroupName = "user--diet-track-created";
  subject: Subjects.UserCreated = Subjects.UserCreated ;
  async onMessage(data: UserCreatedEvent["data"], msg: Message) {
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
    try {
      const user =  await UserSchema.build(
        {
          _id: mongoose.Types.ObjectId(data.userId),
          age: data.age,
          weight: data.weight,
          height: data.height,
        }
      )
      
      await user.save()
      msg.ack();
    }
    catch (Exception) {
      console.log("UserCreatedListener: " + Exception)
      msg.ack();
    }
  

   
  }
}