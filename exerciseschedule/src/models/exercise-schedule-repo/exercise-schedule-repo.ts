import mongoose from "mongoose";
import {UserDocument} from "./user-repo"
const exerciseScheduleSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    document: [
      {
        sameDay: String,
        day: [
          {
            sameExercise: String,
            exercise: {
              exerciseName: String,
              sets: Number,
              reps: [Number],
              description: [String],
              photos: [String],
            },
          },
        ],
      },
    ],

    createAt: Date,
    updateAt: Date,
   
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);
interface ExerciseScheduleAttrs {
  userId: string;
  document: {
    sameDay: string;
    day: {
      sameExercise: String;
      exercise: {
        exerciseName: String;
        sets: Number;
        reps: Number[];
        description: String[];
        photos: String[];
      };
    }[];
  }[];
  createAt?: Date;
  updateAt?: Date;

}
interface ExerciseScheduleDocument extends mongoose.Document {
  userId: string;
  document: {
    sameDay: string;
    day: {
      sameExercise: String;
      exercise: {
        exerciseName: String;
        sets: Number;
        reps: Number[];
        description: String[];
        photos: String[];
      };
    }[];
  }[];
 
 
}

interface ExerciseScheduleModel
  extends mongoose.Model<ExerciseScheduleDocument> {
  build(exercise: ExerciseScheduleAttrs): ExerciseScheduleDocument;
}
exerciseScheduleSchema.statics.build = (exercise: ExerciseScheduleAttrs) => {
  return new exerciseScheduleModel(exercise);
};

const exerciseScheduleModel = mongoose.model<
  ExerciseScheduleDocument,
  ExerciseScheduleModel
>("schedulee", exerciseScheduleSchema);
export { exerciseScheduleModel, ExerciseScheduleAttrs, exerciseScheduleSchema };
