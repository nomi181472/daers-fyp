import { Publisher } from "../base-file/base-publisher";
import { Subjects } from '../base-file/subject';
import { UserInformationEvent } from "../base-file/User-Information-Event";
export class UserInformtionPublisher extends Publisher<UserInformationEvent>{
  subject: Subjects.UserInformation=Subjects.UserInformation;

}







  