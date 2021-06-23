import { Subjects } from "./subject";
export interface UserCreatedEvent{
  subject: Subjects.UserCreated;
  data: {
    age: number;
    bmi: number;
    weight:number;
    height:number;
    userId: string;
    
  
  }
} 