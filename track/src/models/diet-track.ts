import { DietTrackParser } from "./argumentParser";
import { dietTrackModel } from "./exercise-track-repo/diet-track-repo";
import { UserSchema } from "./exercise-track-repo/user-diet-repo";



export class DietTrack{
  constructor() {
  
  }
  public async makeObject(userId: string,currentWeight:number=0) {
    var obj = {
      userId: userId,
      currentWeight: [currentWeight],
      expectedWeight:[0]
    }
    const et = await dietTrackModel.build(obj);
    await et.save();
  }
  public async addNutritions(document: DietTrackParser) {
    const isCurrentUser = await dietTrackModel.findOne( {userId:document.userId} );
    //console.log(isCurrentUser)
    if (!isCurrentUser) {
      
      const isAdd = await dietTrackModel.build({
        userId: document.userId,
        dietScheduleId: document.dietScheduleId,
        dayDate: [document.dayDate],
        totalProteinIntake: [document.totalProteinIntake],
        totalFatsIntake: [document.totalFatsIntake],
        totalCarbohydratesIntake: [document.totalCarbohydratesIntake],
        totalCaloriesIntake: [document.totalCaloriesIntake],
        expectedWeight:[0]
        
      });
      await isAdd.save();  
    }
    else {
     const index = isCurrentUser.dayDate.findIndex((e, d) => e == document.dayDate )
      
      //console.log(index);
        if (index !== -1) {
      
          isCurrentUser.totalProteinIntake[index] += document.totalProteinIntake;
          isCurrentUser.totalFatsIntake[index] += document.totalFatsIntake;
          isCurrentUser.totalCarbohydratesIntake[index] +=document.totalCarbohydratesIntake;
          isCurrentUser.totalCaloriesIntake[index] +=document.totalCaloriesIntake;
         
          isCurrentUser.markModified("totalProteinIntake");
          isCurrentUser.markModified("totalFatsIntake");
          isCurrentUser.markModified("totalCarbohydratesIntake");
          isCurrentUser.markModified("totalCaloriesIntake");
          
          isCurrentUser.save();
         
      }
        else {
          // console.log("else")
          const userinformation = await UserSchema.findById({ _id: document.userId })
          let ew = 0
          
          if (userinformation) {
           
           const calories=await this.calculateCalories(document.userId)
            // console.log(calories)
            if (calories > 1) {
              ew =await this.CalculateWeight(calories, userinformation.height, userinformation.age,
                userinformation.userInformation ? userinformation.userInformation.activityLevel : 0)
              if (ew == NaN){
                return false;
              }
            }
          }

          dietTrackModel.findOneAndUpdate(
            { userId: document.userId },
            {
              $push: {
                dayDate:document.dayDate,
                totalProteinIntake: document.totalProteinIntake, totalFatsIntake: document.totalFatsIntake,
                totalCarbohydratesIntake: document.totalCarbohydratesIntake, totalCaloriesIntake: document.totalCaloriesIntake,
                expectedWeight:ew
                
              }
            },
            {new: true, useFindAndModify: false}
          ).exec();
      }
     
       
      return;
    }
    
  }
  public async calculateCalories(userId: string) {
    const document = await dietTrackModel.findOne({ userId: userId })
    
    if (document) {
      const len = document.totalCaloriesIntake.length
      return document.totalCaloriesIntake[len-1]
    }
    return 0
    //return ((9*fats)+4*(protein+carbohydrates))
  }
  public CalculateWeight(tee: number, height: number, age: number, activity: number) {
    
    console.log(tee,height,age,activity)
   
    return ((tee/activity)+((6.8*age))-66-(5*height))/13.7
  }
  public async getAllData(userId:string) {
    const isCurrentUser = await dietTrackModel.find({ userId:userId});
    //console.log("data",isCurrentUser)
    
    return isCurrentUser;
  }
  public BMR(weight: number, height: number, age: number) {
    console.log('weight'+weight)
    return  66 +(13.7*weight)+(5*height)-(6.8*age)//((10 * weight) + (6.25 * height) - (5 * age) + 5);
  }
  // public PAL() {
  //   const pal: number = 1.76;
  //   return pal;
  // }
  public TotalEnergyExpanditure(weight: number, height: number, age: number, activityLevel: number) {
      
    return (this.BMR(weight,height,age) * activityLevel);
  }//79,176,30
  public async getExpectedWeight(userId:string) {
    const isCurrentUser = await dietTrackModel.findOne({ userId: userId }).select({"expectedWeight":1,"currentWeight":1});
    
    if (isCurrentUser != null && isCurrentUser.expectedWeight?.length && isCurrentUser.currentWeight?.length) {
      const elen = isCurrentUser.expectedWeight.length;
      const clen=isCurrentUser.currentWeight.length;
      return { expectedWeight:isCurrentUser.expectedWeight[elen-1],currentWeight:isCurrentUser.currentWeight[clen-1] }
    }
  }
   
}