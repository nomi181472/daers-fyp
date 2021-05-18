import { exerciseTrackModel } from "./exercise-track-repo/exercise-track-repo"
import  axios  from "axios";
export class ExerciseTrack{
  constructor() {
  
  }
  public async makeObject(userId: string,currentWeight:number=0) {
    var obj = {
      userId: userId,
      currentWeight: currentWeight
    }
    const et = await exerciseTrackModel.build(obj);
    await et.save();
  }
  public  calculateCalorieBurnedFromRunning(obj:any,currentWeight:number) {
    var speed: number[] = [0.5, 1, 1.3, 1.6, 2, 2.5, 3, 4, 4.5, 5, 5.2, 6, 6.7, 7, 7.5, 8, 8.6, 9, 9.4, 10, 10.5, 11, 12, 13, 14]
    var met: number[] = [1.2, 1.6, 2, 3, 3.5, 4, 4.5, 5, 8, 8.3, 9, 9.8, 10.5, 11, 11.5, 11.8, 12.3, 12.8, 13.3, 14.5, 15, 16, 19, 19.8, 23]
    var index = 0;
    
    const mile = obj.running * 0.621371
    const hour = obj.time / 60;
    const speedOfPersion = mile / hour;
    console.log("speedOfPersion"+obj.weight);
    for (var i = 0; i < speed.length; i++){
      if (speedOfPersion <= speed[i]) {
        index = i;
        break;
      }
    }
    const burnedCalories = ((met[index] * currentWeight * 3.5) / 200) * obj.time;
    return burnedCalories;




  }
  
  public async addWeightCapacity(addWeightCapacity: any, userId: any) {
    const et = await exerciseTrackModel.find({ userId: userId });
  
    try {
      if (!et.length) {
        await this.makeObject(userId);
      
      }
    
      const ett = await exerciseTrackModel.findOne({ userId: userId });
     
      var flag: boolean = false;
      if (ett) {
        if (ett && ett.weightCapacity) {
     
          const index = ett.weightCapacity.find((e, ind) => {
            if (e.exerciseName == addWeightCapacity.exerciseName) {
         
              e.weight.push(addWeightCapacity.weight);
              e.reps.push(addWeightCapacity.reps);
              flag = true
         
            }
          });
        }
        if (!flag) {
      
          const obj = {
            exerciseName: addWeightCapacity.exerciseName,
            weight: [addWeightCapacity.weight],
            reps: [addWeightCapacity.reps]
        
          }
        
          ett.weightCapacity.push(obj);
     
      
        }
        ett.markModified("weightCapacity");
        await ett.save();
        return true;
      }
    }
    catch (err) {
        console.log("exercise-track", err)
        return false;
      }
    
  }
  
  public async AddRunning(obj: any, userId: string) {
    try {
      const et = await exerciseTrackModel.findOne({ userId: userId }).select({ totalRunning: 1, currentWeight: 1 });
      console.log(et)
      if (et) {
        
        await this.makeObject(userId);
      
      }
      if (et) {
        const burnedC = this.calculateCalorieBurnedFromRunning(obj, et.currentWeight);
        console.log("burnedC:" + burnedC)
       // const ett = await exerciseTrackModel.find({ userId: userId });
   
        var flag: boolean = false;
        if (et.totalRunning) {
     
          const index = et.totalRunning.find((e, ind) => {
            if (e.date == obj.date) {
              if (e.running)
                e.running += obj.running;
              else
                e.running = obj.running;
            
              if (e.caloriesBurned)
                e.caloriesBurned += burnedC;
              else
                e.caloriesBurned = burnedC;
              flag = true
         
            }
          });
        }
      
        if (!flag) {
      
          const obj2 = {
            date: obj.date,
            running: obj.running,
            caloriesBurned: burnedC
          
        
          }
          et.totalRunning.push(obj2);
     
      
        }
    
        et.markModified("totalRunning");
      
        await et.save();
        console.log(et)
        return;
        console.log(true);
      }
      }
  
    catch(err){
      console.log("exercise-track-addRunning ", err)
      return false;
    }
    
  }
  public async getAllRunningData(userId: string) {
    const et = await exerciseTrackModel.findOne({ userId: userId }).select({ "totalRunning": 1 })
    console.log(et)
    if(et)
      return et
    return false
  }

  public async getAllWeightData(userId: string, query: string) {
    const query_parse = [
      {
          $match: { userId:userId}
      },
      {
          $unwind: "$weightCapacity"
      },
      {
          $match: { "weightCapacity.exerciseName": query }
      },
      {
          $replaceRoot: { newRoot: "$weightCapacity" }
      }
  ]
   // const et = await exerciseTrackModel.findOne({ userId: userId, "weightCapacity.exerciseName": query })
    const et=await exerciseTrackModel.aggregate(query_parse).exec()
    return et[0]
    
  }
  
}