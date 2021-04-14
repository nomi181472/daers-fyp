import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
      userInformation: {
      ques: [String],
      ans: [String],
    },
    services: {
      customExercise: Boolean,
      customDiet: Boolean,
      recommendedExercise: Boolean,
      RecommendedDiet:Boolean
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
  userInformation?: {
    ques:String[],
    ans: String[],
  };
  services?: {
    customExercise: Boolean,
    customDiet: Boolean,
    recommendedExercise: Boolean,
    RecommendedDiet: Boolean
  };
}

//An interface that describe the properties of the user model
interface UserModel extends mongoose.Model<UserDocument> {
  build(user: UserAttrs): UserDocument;
  
}
//interface that describe the properties for the document (single user has)
interface UserDocument extends mongoose.Document {  
  userInformation?: {
    ques:String[],
    ans: String[],
  };
  services?: {
    customExercise: Boolean,
    customDiet: Boolean,
    recommendedExercise: Boolean,
    RecommendedDiet: Boolean
  };
  
}

userSchema.statics.build = (user: UserAttrs) => {
  return new UserSchema(user);
};
const UserSchema = mongoose.model<UserDocument, UserModel>("User", userSchema);

export { UserSchema, UserAttrs, UserDocument };
