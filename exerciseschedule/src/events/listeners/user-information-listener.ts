import { Message } from "node-nats-streaming";

import { UserSchema } from "../../models/exercise-schedule-repo/user-repo";
import { Listener } from "../base-file/base-listener";
import { Subjects } from "../base-file/subject";

import { UserInformationEvent } from "../base-file/User-Information-Event";

export class UserInformationListener extends Listener<UserInformationEvent>{
  queueGroupName = "user-management-service-excercise-schedule-information";
  subject: Subjects.UserInformation = Subjects.UserInformation;
  async onMessage(data:UserInformationEvent ["data"], msg: Message) {
    
    try {
      const userDocument = await UserSchema.findById(data.userId)
      console.log("userDocument: "+userDocument)
      if (userDocument && userDocument.userInformation !== undefined) {

        const sameKeys = (key: any, ind: any) => {
          console.log("data.object[key]"+data.object[key])
          if (userDocument.userInformation !== undefined) userDocument.userInformation[key] = data.object[key];
        };

        Object.keys(data.object).forEach(sameKeys)
       
        userDocument.markModified("userInformation")
        await userDocument.save();
        console.log(userDocument)
        msg.ack();
      }
      else {
        console.log("Id not found");
        msg.ack();
       
        
      }
     
    
    }
    catch (Exception) {
      console.log("UserInformationListener: " + Exception)
      msg.ack();
    }
   
    
  }
  
}