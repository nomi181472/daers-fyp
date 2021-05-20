import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      
      required: true,
    },
    age: {
      type: Number,
      required: true,
      
    },
   
    userInformation: {
      targetGoal: Number,
      activityLevel: Number,
      waist: Number,
      lat:Number,
      chestLevel: Number,
      absLevel: Number,
      backLevel: Number,
      legsLevel: Number,
      shoulderLevel:Number
    },
    
  },
  {
    toJSON: {
      transform(doc: any, ret: any) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);
//newly user required information
interface UserAttrs {
  _id: mongoose.Types.ObjectId;
  age: number;
 
  userInformation?: {
    [targetGoal: string]: string,
    
  }
}

//An interface that describe the properties of the user model
interface UserModel extends mongoose.Model<UserDocument> {
  build(user: UserAttrs): UserDocument;
}
//interface that describe the properties for the document (single user has)
interface UserDocument extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  age: number;
 
  userInformation?: {
    [targetGoal: string]:number
  }
 
  
}
userSchema.statics.build = (user: UserAttrs) => {
  return new UserSchema(user);
};
const UserSchema = mongoose.model<UserDocument, UserModel>("usermuscles", userSchema);

export { UserSchema, UserAttrs, UserDocument };
