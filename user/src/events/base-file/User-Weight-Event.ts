import { Subjects } from "./subject";
export interface UserWeightEvent{
  subject: Subjects.userWeight;
  data: {
    userId: string;
    weight: number;
    
  }
} 