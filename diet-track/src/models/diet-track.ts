import { DietTrackParser } from "./argumentParser";
import { dietTrackModel,DietTrackAttrs } from "./diet-track-repo/diet-track-repo";


export class DietTrack{
  constructor() {
  
  }
  public async addNutritions(document: DietTrackParser) {
    const isCurrentUser = await dietTrackModel.findOne( {userId:document.userId} );
    console.log(isCurrentUser)
    if (!isCurrentUser) {
      
      const isAdd = await dietTrackModel.build({
        userId: document.userId,
        dietScheduleId: document.dietScheduleId,
        dayDate: [document.dayDate],
        totalProteinIntake: [document.totalProteinIntake],
        totalFatsIntake: [document.totalFatsIntake],
        totalCarbohydratesIntake: [document.totalCarbohydratesIntake],
        totalCaloriesIntake: [document.totalCaloriesIntake],
        currentWeight: [document.currentWeight]
      });
      await isAdd.save();  
    }
    else {
     const index = isCurrentUser.dayDate.findIndex((e, d) => e == document.dayDate )
      
      console.log(index);
        if (index !== -1) {
      
          isCurrentUser.totalProteinIntake[index] += document.totalProteinIntake;
          isCurrentUser.totalFatsIntake[index] += document.totalFatsIntake;
          isCurrentUser.totalCarbohydratesIntake[index] +=document.totalCarbohydratesIntake;
          isCurrentUser.totalCaloriesIntake[index] +=document.totalCaloriesIntake;
          isCurrentUser.currentWeight[index] += document.currentWeight;
          isCurrentUser.markModified("totalProteinIntake");
          isCurrentUser.markModified("totalFatsIntake");
          isCurrentUser.markModified("totalCarbohydratesIntake");
          isCurrentUser.markModified("totalCaloriesIntake");
          isCurrentUser.markModified("currentWeight");
          isCurrentUser.save();
         
      }
        else {
          //console.log("else")
          dietTrackModel.findOneAndUpdate(
            { userId: document.userId },
            {
              $push: {
                dayDate:document.dayDate,
                totalProteinIntake: document.totalProteinIntake, totalFatsIntake: document.totalFatsIntake,
                totalCarbohydratesIntake: document.totalCarbohydratesIntake, totalCaloriesIntake: document.totalCaloriesIntake,
                currentWeight:document.currentWeight
              }
            },
            {new: true, useFindAndModify: false}
          ).exec();
      }
        console.log(this.TotalEnergyExpanditure())
      return;
    }
    
  }
  public async getAllData(userId:string) {
    const isCurrentUser = await dietTrackModel.find({ userId:userId});
    console.log("data",isCurrentUser)
    
    return isCurrentUser;
  }
  public BMR(weight:number,height:number,age:number) {
    return ((10 * weight) + (6.25 * height) - (5 * age) + 5);
  }
  public PAL() {
    const pal: number = 1.76;
    return pal;
  }
  public TotalEnergyExpanditure() {
    return (this.BMR(79, 176, 30) * this.PAL());
  }
  
}