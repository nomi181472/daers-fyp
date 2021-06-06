import { Subjects } from "./subject";
export interface UserCreatedEvent{
  subject: Subjects.UserCreated;
  data: {
    userId: string;
    weight: number;
    age: number;
    height: number;
  }
} 