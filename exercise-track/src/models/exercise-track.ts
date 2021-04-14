import { exerciseTrackModel } from "./exercise-track-repo/exercise-track-repo"
import  axios  from "axios";
export class ExerciseTrack{
  constructor() {
  
  }
  public async makeObject(userId: string) {
    var obj = {
      userId: userId
    }
    const et = await exerciseTrackModel.build(obj);
    await et.save();
  }
  public  calculateCalorieBurnedFromRunning(obj:any) {
    var speed: number[] = [0.5, 1, 1.3, 1.6, 2, 2.5, 3, 4, 4.5, 5, 5.2, 6, 6.7, 7, 7.5, 8, 8.6, 9, 9.4, 10, 10.5, 11, 12, 13, 14]
    var met: number[] = [1.2, 1.6, 2, 3, 3.5, 4, 4.5, 5, 8, 8.3, 9, 9.8, 10.5, 11, 11.5, 11.8, 12.3, 12.8, 13.3, 14.5, 15, 16, 19, 19.8, 23]
    var index = 0;
    
    const mile = obj.running * 0.621371
    const hour = obj.time / 60;
    const speedOfPersion = mile / hour;
    console.log(speedOfPersion);
    for (var i = 0; i < speed.length; i++){
      if (speedOfPersion <= speed[i]) {
        index = i;
        break;
      }
    }
    const burnedCalories = ((met[index] * obj.weight * 3.5) / 200) * obj.time;
    return burnedCalories;




  }
  public async getweight(headers:any) {
    // const url: string = "localhost:3010/api-gateway/current-user/weightAndHeight";
    // console.log("run");
    // const res = await axios.get(url, { headers: {cookie:headers.cookie} , withCredentials: true });
    // console.log("run");
    // console.log(res);
  }
  public async addWeightCapacity(addWeightCapacity:any,userId:any,headers:any) {
    const et = await exerciseTrackModel.find({ userId: userId });
   await  this.getweight(headers);
    try {
      if (!et.length) {
        await this.makeObject(userId);
      
      }
    
      const ett = await exerciseTrackModel.find({ userId: userId });
     
      var flag: boolean = false;
      if (ett[0].weightCapacity) {
     
        const index = ett[0].weightCapacity.find((e, ind) => {
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
        ett[0].weightCapacity.push(obj);
     
      
      }
    //  ett[0].markModified("weightCapacity");
     // await ett[0].save();
      return true;
    }
    catch (err) {
      console.log("exercise-track", err)
      return false;
    }
  }
  public async AddRunning(obj: any, userId: string) {
    try {
      const et = await exerciseTrackModel.find({ userId: userId });
      if (!et.length) {
        await this.makeObject(userId);
      
      }
     const burnedC= this.calculateCalorieBurnedFromRunning(obj);
      const ett = await exerciseTrackModel.find({ userId: userId });
   
      var flag: boolean = false;
      if (ett[0].totalRunning) {
     
        const index = ett[0].totalRunning.find((e, ind) => {
          if (e.date == obj.date) {
            if (e.running)
              e.running += obj.running;
            else
              e.running = obj.running;
            
            if(e.caloriesBurned)
            e.caloriesBurned += burnedC;
            else
            e.caloriesBurned = burnedC;
            flag = true
         
          }
        });
      }
      
      if (!flag) {
      
        const obj2 = {
         date : obj.date,
          running: obj.running,
          caloriesBurned: burnedC
          
        
        }
        ett[0].totalRunning.push(obj2);
     
      
      }
    
      ett[0].markModified("totalRunning");
      
      await ett[0].save();
      return;
      console.log(true);
    }
    catch(err){
      console.log("exercise-track-addRunning ", err)
      return false;
    }
    
  }
  
}