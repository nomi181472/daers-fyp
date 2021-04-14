import mongoose from "mongoose";
const exerciseTrackSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
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

export { exerciseTrackSchema as exerciseTrackSchema };