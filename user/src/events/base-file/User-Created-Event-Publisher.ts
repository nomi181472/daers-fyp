import { Publisher } from "./base-publisher";
import { UserCreatedEvent } from "./User-Created-Event";
import { Subjects } from "./subject";




export class UserCreatedPublisher extends Publisher<UserCreatedEvent>{
  subject: Subjects.UserCreated=Subjects.UserCreated;
  
}