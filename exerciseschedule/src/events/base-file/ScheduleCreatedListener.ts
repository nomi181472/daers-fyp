import { Message } from "node-nats-streaming";
import { Listener } from "./base-listener";
import { Subjects } from "./subject";
import mongoose from "mongoose";
import { userSchema } from "./user-schema";
 export class EScheduleCreatedListener extends Listener<EScheduleCreatedEvent> {
   subject: Subjects.ExerciseScheduleCreated = Subjects.ExerciseScheduleCreated;
  queueGroupName = "queue-group-name"
  async onMessage(data: EScheduleCreatedEvent["data"], msg: Message)
  {  
    msg.ack();
    mongoose.connect('mongodb://localhost/default',{useNewUrlParser: true,useUnifiedTopology: true});
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
      console.log('connected');
    });
    const myDB = mongoose.connection.useDb('user');
      const UserInfo = myDB.model('users', userSchema);
   console.log(UserInfo);
    var dat = await UserInfo.findOne({email:"test0@test.com"});
    console.log(dat);
    console.log("after ack", data);
  }
}