import { Subjects } from "./subject";
export interface UserCreatedEvent{
  subject: Subjects.UserCreated;
  data: {
    age: number;
    bmi: number;
    height:number;
    weight:number;
    userId: string;

  
  }
} 