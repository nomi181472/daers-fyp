import { Publisher } from "../base-file/base-publisher";
import { UserWeightEvent } from '../base-file/User-Weight-Event';
import { Subjects } from '../base-file/subject';


export class UserWeightPublisher extends Publisher<UserWeightEvent>{
  subject: Subjects.userWeight=Subjects.userWeight;

}







  