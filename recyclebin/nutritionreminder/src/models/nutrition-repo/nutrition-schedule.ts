import mongoose from "mongoose";
const nutritionScheduleSchema = new mongoose.Schema(
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
            dayTime: String,
            time: [
              {
                sameNutrition: String,
                nutrition: {
                  nutritionName: String,
                  calories: Number,
                  fats: Number,
                  protein: Number,
                  carbohydrates: Number,
                  description: [String],
                  photos: [String],
                },
              },
            ],
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
interface NutritionFactsScheduleAttrs {
  userId: string;
  document: {
    sameDay: string;
    day: {
      dayTime: String;
      time: {
        sameNutrition: String;
        nutrition: {
          nutritionName: String;
          calories: Number;
          fats: Number;
          protein: Number;
          carbohydrates: Number;
          description: [String];
          photos: [String];
        };
      }[];
    }[];
  }[];

  createAt?: Date;
  updateAt?: Date;
}
interface NutritionFactsScheduleDocument extends mongoose.Document {
  userId: string;
  document: {
    sameDay: string;
    day: {
      dayTime: String;
      time: {
        sameNutrition: String;
        nutrition: {
          nutritionName: String;
          calories: Number;
          fats: Number;
          protein: Number;
          carbohydrates: Number;
          description: [String];
          photos: [String];
        };
      }[];
    }[];
  }[];

  createAt?: Date;
  updateAt?: Date;
}

interface NutritionFactsScheduleModel
  extends mongoose.Model<NutritionFactsScheduleDocument> {
  build(nutrition: NutritionFactsScheduleAttrs): NutritionFactsScheduleDocument;
}
nutritionScheduleSchema.statics.build = (
  nutritionSchedule: NutritionFactsScheduleAttrs
) => {
  return new nutritionScheduleModel(nutritionSchedule);
};

const nutritionScheduleModel = mongoose.model<
  NutritionFactsScheduleDocument,
  NutritionFactsScheduleModel
>("schedulenf", nutritionScheduleSchema);
export { nutritionScheduleModel, NutritionFactsScheduleAttrs };
