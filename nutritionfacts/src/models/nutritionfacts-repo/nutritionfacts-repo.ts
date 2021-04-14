import mongoose from "mongoose";
const nutritionfactSchema = new mongoose.Schema(
  {
    nutritionCategory: {
      type: String,
    },
    nutritionName: {
      type: String,
    },
    fatsSub: {
      type: {},
    },
    fats: {
      type: Number,
    },
    sugarsSub: {
      type: {},
    },
    sugars: {
      type: Number,
    },
    totalLipids: {
      type:Number,
    },
    mineralsCategory: {
      type: {},
    },
    vitaminCategory: {
      type: {},
    },
    createdAt: {
      type: Date,
      Default: Date.now,
    },
    updatedAt: {
      type: Date,
      Default: Date.now,
    },
    carbohydrates: {
      type:Number,
    },
    cholestrol: {
      type: Number,
    },
    fiber: {
      type: Number,
    },
    calories: {
      type: Number,
    },
    proteinCategory: {
      type: {},
    },
    protein: {
      type: Number,
    },
    water: {
      type:Number,
    },

    photos: {
      photosUrl: [String],
      mainPhoto: String,
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

interface NutritionFactAttrs {
  nutritionCategory: string;
  nutritionName: string;
  fatsSub?: {};
  fats?: number;
  sugarsSub?: {};
  sugars?: number;
  totalLipids?: number;

  mineralsCategory?: {};
  createdAt?: Date;
  updatedAt?: Date;
  carbohydrates?: number;
  cholestrol?: number;
  fiber?: number;
  calories?: number;
  proteinCategory?: {};
  protein?: number;
  water?: number;
  photos?: {
    photosUrl: String[];
    mainPhoto: String;
  };
}
interface NutritionFactDocument extends mongoose.Document {
  nutritionCategory: string;
  nutritionName: string;
  fatsSub?: {};
  fats?: number;
  sugarsSub?: {};
  sugars?: number;
  totalLipids?: number;

  mineralsCategory?: {};
  createdAt?: Date;
  updatedAt?: Date;
  carbohydrates?: number;
  cholestrol?: number;
  fiber?: number;
  calories?: number;
  proteinCategory?: {};
  protein?: number;
  water?: number;
  photos?: {
    photosUrl: String[];
    mainPhoto: String;
  };
}

interface NutritionFactModel extends mongoose.Model<NutritionFactDocument> {
  build(nutrition: NutritionFactAttrs): NutritionFactDocument;
}
nutritionfactSchema.statics.build = (nutrition: NutritionFactAttrs) => {
  return new nutritionFactModel(nutrition);
};

const nutritionFactModel = mongoose.model<
  NutritionFactDocument,
  NutritionFactModel
>("nutritionfacts", nutritionfactSchema);
export { nutritionFactModel, NutritionFactAttrs };
