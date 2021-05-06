import { Message } from "node-nats-streaming";
import { exerciseScheduleModel } from "../../models/exercise-schedule-repo/exercise-schedule-repo";
import { UserSchema } from "../../models/exercise-schedule-repo/user-repo";
import { Listener } from "../base-file/base-listener";
import { Subjects } from "../base-file/subject";
import { UserCreatedEvent } from "../base-file/User-Created-Event";
import mongoose from 'mongoose';

export class UserCreatedListener extends Listener<UserCreatedEvent>{
  queueGroupName = "user-management-service-excercise-schedule";
  subject: Subjects.UserCreated = Subjects.UserCreated;
  async onMessage(data: UserCreatedEvent["data"], msg: Message) {
    
    try {
      const user = await await UserSchema.build(
        {
          _id: mongoose.Types.ObjectId(data.userId),
          age: data.age,
          bmi: data.bmi,
        }
      )
      console.log(data.userId)
      await user.save()
      console.log(user)
      msg.ack();
    }
    catch (Exception) {
      console.log("UserCreatedListener: " + Exception)
      msg.ack();
    }
  }
}