import mongoose from "mongoose";
const exerciseTrackSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    currentWeight: {
      type: String,
     
    },
    weightCapacity:[{
      exerciseName: String,
      reps:[Number],
      weight: [Number]
    }],
    totalRunning: [{
      date: String,
      running:Number,
      caloriesBurned: Number
    }],

  
    createAt: Date,
    updateAt: Date,
  },
  {
     
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret.__v;
        delete ret._id;
      },
    },
  }
);
interface ExerciseTrackAttrs {
  userId: string;
  currentWeight: number;
  weightCapacity?: {
    
    exerciseName: string,
    reps:number[],
    weight: number[]
  }[],
  totalRunning?: {
    date: string,
    running:number,
    caloriesBurned: number
    
  }[],
  createAt?: Date;
  updateAt?: Date;

}

interface ExerciseTrackDocument extends mongoose.Document {
 
  userId: string;
  currentWeight: number;
  weightCapacity:{
    exerciseName: string,
    weight: number[]
    reps:number[],
  }[],
  totalRunning: {
    date: string,
    running:number,
    caloriesBurned: number
    
  }[],
  createAt?: Date;
  updateAt?: Date;

}

interface ExerciseTrackModel
  extends mongoose.Model<ExerciseTrackDocument> {
  build(exerciseTrack: ExerciseTrackAttrs): ExerciseTrackDocument;
}
exerciseTrackSchema.statics.build = (exerciseTrack: ExerciseTrackAttrs) => {
  return new exerciseTrackModel(exerciseTrack);
};

const exerciseTrackModel = mongoose.model<
ExerciseTrackDocument,
ExerciseTrackModel
>("exercisetrack", exerciseTrackSchema);
export { exerciseTrackModel, ExerciseTrackAttrs, exerciseTrackSchema };
