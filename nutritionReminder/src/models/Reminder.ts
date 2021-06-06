import {nutritionScheduleModel,NutritionFactsScheduleAttrs } from "./nutrition-repo/nutrition-schedule";

export class Reminder {
  constructor() {}
  filterDate(a: any) {
    const aa = new Date(a.sameDay)
    var bb = new Date().toISOString().substring(0, 10);
    var datt = new Date(bb)
    //console.log(aa);
    if (aa >= datt) {
      return aa
    }
    return 0;
  }
  public async sortDates(id: any) {
    const data = await nutritionScheduleModel
    .findById(id).select("document.sameDay");
    if (data) {
      var dat = data!.document.sort(this.byDate)
      var datt2 = dat.filter(this.filterDate)
      if (datt2.length)
        return datt2
      return "No-Date";
    }
    else
      return null;
  }
  
  byDate(a: any, b: any) {
    const aa = new Date(a.sameDay)
    const bb = new Date(b.sameDay)

    if (aa < bb) return -1;
    if (aa > bb) return 1;
    return 0;
  }
  public async countRemaining(id: any)
  {
    //console.log("run")
    const data = await nutritionScheduleModel
    .findById(id).select("document.sameDay");
    //console.log(data);
    return 30 - data!.document.length;
  } 
  
  public async reScheduleNf(id: any) {
    const dates = await this.sortDates(id);

    if (dates === "No-Date") {
      if (await this.countRemaining(id)) {
    
        const data = await nutritionScheduleModel.findById(id);

        if (data) {
          data.document.sort(this.byDate);
          
          
          data.document.forEach((value,ind) => {
            const todayDate = new Date()
            todayDate.setDate(todayDate.getDate() + ind + 1)
            value.sameDay = todayDate.toISOString().substring(0, 10);
            return value
          });
          console.log(data.document);
          await data.save();
         
          
        }
      }
      else {
        return "Create-Schedule"
      }
    }
    else {
      return "Some Dates are left";
    }

  }
}
    