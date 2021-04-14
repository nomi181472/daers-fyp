import { ExerciseAttrs, exerciseModel } from "./exercise-repo/exercise-repo";

export class Exercise {
  constructor() {}
  public async addExercise(exercise: ExerciseAttrs) {
    try {
      const ex = exerciseModel.build(exercise);
      await ex.save();

      return ex;
    } catch (err) {
      console.log("ErrorPosition:addExercise", err);
      return null;
    }
  }
  public async updateExercise(exercise: ExerciseAttrs, exerciseId: String) {
    try {
      const ex = await exerciseModel.findById(exerciseId);
      if (!ex) {
        return "id-notfound";
      }
      ex.set(exercise);

      await ex.save();
      return ex;
    } catch (err) {
      console.log("ErrorPosition:updateExercise", err);
      return null;
    }
  }
  public async deleteExercise(exerciseId: String) {
    try {
      const ex = await exerciseModel.findById(exerciseId);
      if (!ex) {
        return "id-notfound";
      }
      const { n, ok, deletedCount } = await exerciseModel.deleteOne({
        _id: exerciseId,
      });

      return true;
    } catch (err) {
      console.log("ErrorPosition:deleteExercise", err);
      return null;
    }
  }
  public async detailExercise(exerciseId: String) {
    try {
      const ex = await exerciseModel.findById(exerciseId);
      if (!ex) {
        return "id-notfound";
      }

      return ex;
    } catch (err) {
      console.log("ErrorPosition:detailExercise", err);
      return null;
    }
  }
  public async listExercise(query: any) {
    let ex:any;
    try {
      const page= query.page||1
      const  perPage = parseInt(page) || 10
      
      var pagination = {
        limit: perPage ,
        skip:perPage * (page - 1)
      }
      const { exerciseCategory } = query
      if (typeof exerciseCategory === "undefined") { 
        ex = await exerciseModel.find({});
      }

      else {
        ex = await exerciseModel.find({ exerciseCategory: exerciseCategory }).exec();
      }
      if (!ex) {
        return "empty";
      }

      return ex;
    } catch (err) {
      console.log("ErrorPosition:listExercise", err);
      return null;
    }
  }
}
