import {
  nutritionFactModel,
  NutritionFactAttrs,
} from "./nutritionfacts-repo/nutritionfacts-repo";

export class NutritionFacts {
  constructor() {}
  public async addNutritionFacts(nutrition: NutritionFactAttrs) {
    try {
      const nt = nutritionFactModel.build(nutrition);
      await nt.save();

      return nt;
    } catch (err) {
      console.log("nutrition:addNutritionFacts:Error:\n"+ err);
      return null;
    }
  }
  public async updateNutritionFacts(
    nutrition: NutritionFactAttrs,
    nutritionId: String
  ) {
    try {
      const nt = await nutritionFactModel.findById(nutritionId);
      if (!nt) {
        return "id-notfound";
      }
      nt.set(nutrition);

      await nt.save();
      return nt;
    } catch (err) {
      console.log("nutrition:updateNutritionFacts:Error:\n"+ err);
      return null;
    }
  }
  public async deleteNutritionFacts(nutritionId: String) {
    try {
      const nt = await nutritionFactModel.findById(nutritionId);
      if (!nt) {
        return "id-notfound";
      }
      const { n, ok, deletedCount } = await nutritionFactModel.deleteOne({
        _id: nutritionId,
      });

      return true;
    } catch (err) {
      console.log("nutrition:deleteNutritionFacts:Error:\n"+ err);
      return null;
    }
  }
  public async detailNutrition(nutritionId: String) {
    try {
      const nt = await nutritionFactModel.findById(nutritionId);
      if (!nt) {
        return "id-notfound";
      }

      return nt;
    } catch (err) {
      console.log("nutrition:detailNutrition:Error:\n"+ err);
      return null;
    }
  }
  public async listNutritionFacts(query: any) {
    let nt:any;
    try {
      
      const { nutritionCategory } = query
      if (typeof nutritionCategory === "undefined") { 
        nt = await nutritionFactModel.find({});
      } 
     
      else {
        nt = await nutritionFactModel.
        find({ nutritionCategory: nutritionCategory }).exec();
      }

      if (!nt) {
        return "empty";
      }
      //console.log(nt);
      return nt;
    } catch (err) {
      console.log("nutrition:listNutritionFacts:Error:\n"+ err);
      return null;
    }
  }
}
