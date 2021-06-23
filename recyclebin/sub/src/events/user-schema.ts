import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
      
    },
    bmi: {
      type: Number,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    country: {
      type: String,
    },
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
    createdAt: {
      type: Date,
      Default: Date.now,
    },
    updatedAt: {
      type: Date,
      Default: Date.now,
    },
    photos: {
      photosUrl: [String],
      mainPhoto: String,
      updatedMainPhoto: {
        type: Date,
        Default: Date.now,
      },
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

//An interface that describe the properties of the user model

//interface that describe the properties for the document (single user has)



/*
const user=User.build({
  email: "",
  firstName: "",
  lastName: "",
  password: "",
  age: 23,
  bmi: 2.3,
  weight: 23.4,
  height: 2.3,
});
user.email;
user.unemai*/
/*
const build = (user: UserAttrs) => {
  return new User(user);
};
build({
  email: "",
  firstName: "",
  lastName: "",
  password: "",
  age: 23,
  bmi: 2.3,
  weight: 23.4,
  height: 2.3,
});*/
export { userSchema};
