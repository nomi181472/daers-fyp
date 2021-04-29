import { MuscleAttrs, muscleModel } from "./muscle-repo/muscle-repo";

export class Muscle{
  constructor() {}
  public async addPhotos(photos: any, userId: any) {
    const is_muscle = await muscleModel.findOne({ userId: userId });
    
    if (is_muscle != null) {
      is_muscle.photos.frontPose =photos.frontPose
      console.log(photos)
      is_muscle.photos.backPose = photos.backPose
      await is_muscle.save();
      return is_muscle;
    }
    else {
      const object = {
        userId: userId,
        status: "pending",
        chest: {
          isValid: false,
          level: 0
        },
        back: {
          isValid: false,
          level: 0
        },
        thighs: {
          isValid: false,
          level: 0
        },
        shoulder: {
          isValid: false,
          level: 0
        },
        photos: photos,
      }
      const m = await muscleModel.build(object);
      await m.save();
      return m;
    }
    
  }
  
  public async list(query: any) {
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
        ex = await muscleModel.find({});
      }

      else {
        ex = await muscleModel.find({ exerciseCategory: exerciseCategory }).exec();
      }
      if (!ex) {
        return "empty";
      }

      return ex;
    } catch (err) {
      console.log("ErrorPosition:muscle list", err);
      return null;
    }
  }
}
