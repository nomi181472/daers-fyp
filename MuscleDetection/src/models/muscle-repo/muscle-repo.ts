import mongoose from "mongoose";
const muscleSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    status: {
      type:String,
    },
    chest: {
      isValid: Boolean,
      level:Number,
    },
    back: {
      isValid: Boolean,
      level:Number,
    },
    abs: {
      isValid: Boolean,
      level:Number,
    },
    thighs: {
      isValid: Boolean,
      level:Number,
    },
    shoulder: {
      isValid: Boolean,
      level:Number,
    },
    photos: {
      frontPose: String,
     
      backPose:String
      
    },
    createdAt: {
      type: Date,
      Default: Date.now,
    },
    updatedAt: {
      type: Date,
      Default: Date.now,
    },
    
  },
  {
    toJSON: {
      transform(doc: any, ret: any) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

interface MuscleAttrs {
  userId: string;
  status: string;
  chest: {
    isValid: Boolean;
    level: Number;
  };
  back: {
    isValid: Boolean;
    level: Number;
  };
  abs: {
    isValid: Boolean;
    level: Number;
  };
  thighs: {
    isValid: Boolean;
    level: Number;
  };
  shoulder: {
    isValid: Boolean;
    level: Number;
  };

  photos: {
    frontPose: String;
    
    backPose: String;
    
  };
  createdAt?:  Date;
  updatedAt?: Date;

  
}
interface MuscleDocument extends mongoose.Document {
  userId: string;
  status: string;
  chest: {
    isValid: Boolean;
    level: Number;
  };
  back: {
    isValid: Boolean;
    level: Number;
  };
  abs: {
    isValid: Boolean;
    level: Number;
  };
  thighs: {
    isValid: Boolean;
    level: Number;
  };
  shoulder: {
    isValid: Boolean;
    level: Number;
  };
  photos: {
    frontPose: String;
    
    backPose: String;
    
  };
  createdAt?: Date;
  updatedAt?: Date;

}

interface MuscleModel extends mongoose.Model<MuscleDocument> {
  build(exercise: MuscleAttrs): MuscleDocument;
}
muscleSchema.statics.build = (exercise: MuscleAttrs) => {
  return new muscleModel(exercise);
};
//const exerciseModel = mongoose.model("exercise", exerciseSchema);
const muscleModel = mongoose.model<MuscleDocument, MuscleModel>(
  "muscles",
  muscleSchema
);
export { muscleModel, MuscleAttrs };
