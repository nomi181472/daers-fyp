import { Message } from "node-nats-streaming";
import { Listener } from "./base-listener";
import { EScheduleCreatedEvent } from "./ESchedule-Created-Event";
import { Subjects } from "./subject";
import mongoose from "mongoose";
import { userSchema } from "./user-schema";
import { exerciseTrackSchema } from "./schemas/exercise-track-schema";
 export class EScheduleCreatedListener extends Listener<EScheduleCreatedEvent> {
   subject: Subjects.ExerciseScheduleCreated = Subjects.ExerciseScheduleCreated;
  queueGroupName = "queue-group-name"
  async onMessage(data: EScheduleCreatedEvent["data"], msg: Message)
  {
    
    console.log(data);
    msg.ack();
    mongoose.connect('mongodb://localhost/default',{useNewUrlParser: true,useUnifiedTopology: true});
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
      console.log('connected');
    });
    const myDB = mongoose.connection.useDb('exercisetrack');
      const UserInfo = myDB.model('exercisetrack', exerciseTrackSchema);
    //console.log(UserInfo);
   

    const small = new UserInfo({ userId:data.userId});
await small.save();
   
    //console.log(small);
    console.log("after ack", );
  }
}