import { Publisher } from "../base-file/base-publisher";
import { UserCreatedEvent } from '../base-file/User-Created-Event';
import { Subjects } from '../base-file/subject';


export class UserCreatedPublisher extends Publisher<UserCreatedEvent>{
  subject: Subjects.UserCreated=Subjects.UserCreated;

}

