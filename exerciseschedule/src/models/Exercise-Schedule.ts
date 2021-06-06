import {
  exerciseScheduleModel,
  ExerciseScheduleAttrs,
} from "./exercise-schedule-repo/exercise-schedule-repo";
import { UserSchema } from "./exercise-schedule-repo/user-repo"
export class ExerciseSchedule {
  constructor() {}
  public async addSchedule(exerciseScheduleAttrs: ExerciseScheduleAttrs) {
    try {
      const isScheduleExist = await exerciseScheduleModel.
      findOne({ userId: exerciseScheduleAttrs.userId })
      console.log(isScheduleExist)
      if (!isScheduleExist) {
        let result = await exerciseScheduleModel.build(exerciseScheduleAttrs);
        let user = await UserSchema.modelName
        // console.log(user, exerciseScheduleAttrs.userId)
        await result.save();
        return result;
      }
      else
        return "schedule-Exist"
    } catch (err) {
      console.log("exerciseschedule:addSchedule:error\n", err);
      return null;
    }
  }
  public async listSchedules() {
    try {
      const schedule = await exerciseScheduleModel.find({});
     
      return schedule;
    } catch (err) {
      console.log("exerciseschedule:listSchedules:error\n", err);
      return null;
    }
  }
  public async getScheduleId(id: String) {
    try {
      const schedulee = await exerciseScheduleModel.findById(id);
      return schedulee;
    } catch (err) {
      console.log("exerciseschedule:getScheduleId:error\n", err);
      return 0;
    }
  }
  private findSameDay(document: any, dayR: any) {
    let index: number = -1;
    for (var i = 0; i < document.length; i++) {
      document[i].sameDay;
      if (dayR === document[i].sameDay) {
        index = i;
        break;
      }
    }
    return index;
  }
  public async updatechedule(scheduleId: String, userId: String, body: any) {
    try {
      const schedule = await exerciseScheduleModel.findById(scheduleId);
      if (!schedule) {
        return "id-not-found";
      }

      if (userId !== schedule!.userId) {
        return "required-authorization";
      }
      const dayR = body.document[0].sameDay;
     
      const { document } = schedule;
     
      let index: number = this.findSameDay(document, dayR);
    
      if (index >= 0) {
        document[index].day.push(body.document[0].day[0]);
      } else {
        //if not same day
        document.push(body.document[0]);
      }

      await schedule.save();
      return schedule;
    } catch (err) {
      console.log("exerciseschedule:updatechedule:error\n", err);
      return null;
    }
  }
  private findSameExercise(document: any, index: number, exerciseId: String) {
    let index2: number = -1;
    for (var i = 0; i < document[index].day.length; i++) {
      if (document[index].day[i].sameExercise === exerciseId) {
        index2 = i;
        break;
      }
    }
    return index2;
  }
  public async updateScheduleObject(
    scheduleId: String,
    body: any,
    exerciseId: String,
    currentUserId: String
  ) {
    try {
      const schedule = await exerciseScheduleModel.findById(scheduleId);
      const dayR = body.document[0].sameDay;
      const document = schedule!.document;

      if (!schedule) {
        return "not-found";
      }

      if (currentUserId !== schedule!.userId) {
        return "required-authorization";
      }
      let index: number = this.findSameDay(document, dayR);
      if (index === -1) {
        return "not-same-day";
      }
      let index2: number = -1;
      if (index >= 0) {
        index2 = this.findSameExercise(document, index, exerciseId);

        if (index2 >= 0) {
          schedule.document[index].day[index2] = body.document[0].day[0];
        } else {
          return "exerciseId-notFound";
        }
      }
      await schedule.save();
      return schedule.document[index].day[index2];
    } catch (err) {
      console.log("exerciseschedule:updateScheduleObject:error\n", err);
      return null;
    }
  }
  public async deleteSchedule(id: String, currentUserID: String) {
    try {
      const schedule = await exerciseScheduleModel.findById(id);

      if (!schedule) {
        return "not-found";
      }
      if (currentUserID !== schedule!.userId) {
        return "required-authorization";
      }
      const { n, ok, deletedCount } = await exerciseScheduleModel.deleteOne({
        _id: id,
      });
      return { n, ok, deletedCount };
    } catch (err) {
      console.log("exerciseschedule:deleteSchedule:error\n", err);
      return null;
    }
  }
  public async deleteScheduleObject(
    scheduleId: String,
    currentUserId: String,
    exerciseId: String,
    date:string
  ) {
    try {
      const schedule = await exerciseScheduleModel.findById(scheduleId);
      
      if (!schedule) {
        return "not-found";
      }

      if (currentUserId !== schedule!.userId) {
        return "required-authorization";
      }
      let index: number=0;
      for (var i = 0; i < schedule!.document.length; i++) {
        
        if (schedule.document[i].sameDay === date) {
          index = i;
          break;
        }
        
      }
     
      for (var j = 0; j < schedule.document[index].day.length; j++) {
        if (schedule.document[index].day[j].sameExercise === exerciseId) {
        
          schedule.document[index].day.splice(j, 1);
          if (!schedule.document[index].day.length) {
           
            schedule.document.splice(index, 1);
          }  
          console.log("found");
          await schedule.save();
          return true;
        }
      }
      return "exerciseId-notFound";
    } catch (err) {
      console.log("exerciseschedule:deleteScheduleObject:error:\n", err);
      return null;
    }
  }
  public async getUserScheduleId(userId:string) {
   //const schedule = await exerciseScheduleModel.find({ userId: userId })
   try{
   const schedule = await exerciseScheduleModel.aggregate(
    [
      { $match: { userId:userId }},
      
      { $unwind: '$document' },
      
      { $sort: { 'document.sameDay': 1}},
      
      { $group: { _id: '$_id', document: { $push: '$document'}}}

    ])
    return schedule;
  }
  catch(err){
    console.log("exerciseschedule:getUserScheduleId:error:\n", err)
    return "fetching user schedule error"
  }

   
   // console.log(schedule)
    
  }
  public async deleteDay(id: string,day:string)
  {
    try{
    const schedule = await exerciseScheduleModel.findById(id);
    if (schedule) {
     
      for (var i = 0; i < schedule!.document.length; i++) {
        
        if (schedule.document[i].sameDay === day) {
          const index = i
          schedule.document.splice(index, 1);
          await schedule.save();         
          return true;          
        }
        
      }
      return false
    }
    else {
      return false;
    } 
  }
  catch(err){
    console.log("exerciseschedule:deleteDay:error:\n", err);
    return false;
  }
}
}
