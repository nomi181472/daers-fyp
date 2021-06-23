import { MuscleAttrs, muscleModel } from "./muscle-repo/muscle-repo";

export class Muscle {
  constructor() {}
  public async addPhotos(photos: any, userId: any) {
    const is_muscle = await muscleModel.findOne({ userId: userId });
    //console.log(is_muscle)
    if (is_muscle != null) {
      is_muscle.photos.frontPose = photos.frontPose;
      //console.log(photos)
      is_muscle.photos.backPose = photos.backPose;
      await is_muscle.save();
      return is_muscle;
    } else {
      const object = {
        userId: userId,
        status: "pending",
        chest: {
          isValid: false,
          level: 0,
        },
        abs: {
          isValid: false,
          level: 0,
        },
        back: {
          isValid: false,
          level: 0,
        },
        legs: {
          isValid: false,
          level: 0,
        },
        shoulder: {
          isValid: false,
          level: 0,
        },
        biceps: {
          isValid: false,
          level: 0,
        },
        triceps: {
          isValid: false,
          level: 0,
        },
        photos: photos,
      };
      const m = await muscleModel.build(object);
      await m.save();
      return m;
    }
  }

  public async list(userId: string) {
    const mm = await muscleModel.findOne({ userId: userId });
    if (mm) {
      return mm.photos;
    }
    return "";
  }
}
