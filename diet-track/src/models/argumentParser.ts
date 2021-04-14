interface DietTrackParser {
  userId: string;
  dietScheduleId: string,
  dayDate: string,
  totalCaloriesIntake: number,
  totalProteinIntake: number,
  totalCarbohydratesIntake: number,
  totalFatsIntake: number,
  currentWeight: number,
  

}

export { DietTrackParser };