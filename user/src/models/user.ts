import { BadRequestError } from "../errors/bad-request-error";
import { UserSchema, UserAttrs, UserDocument } from "./user-repo/user-repo";
export class User {
  constructor() { }
  public async addUser(_user: UserAttrs) {
    try {
        const user = UserSchema.build(_user);
        await user.save();
        return user;
    } 
    catch (err) {
        console.log("user:addUser:error:\n"+err);
        return null;
    }
  }
  public async addUserInformation(object:any,userId:string) {
    try {
        const userDocument:UserDocument|null =await  UserSchema.findById(userId);
        if (userDocument
           &&
           userDocument.userInformation!==undefined)  
           {
          //const userObjectKeys = Object.keys(userDocument.userInformation);    
          const  sameKeys=(key:string,ind:any) =>{
            if (userDocument.userInformation !== undefined) 
            userDocument.userInformation[key] = object[key]; 
          }
          Object.keys(object).forEach(sameKeys) 
          userDocument.
          markModified("userInformation")
          await userDocument.save();
        }
        else 
        new BadRequestError("user id not found")
    }
    catch (err) {
      console.log("user:addUserInformation:error:\n"+err);
    }
  }

  public async updateUser(_user: UserAttrs, userId: String) {
    try {
      const user:UserDocument|null = await UserSchema.findById(userId);      
      if (!user) return "id-notfound";
      user.set(_user);
      await user.save();
      return user;
    } catch (err) {
      console.log("user:updateUser:error:\n"+ err);
      return null;
    }
  }

  public async deleteUser(userId: String) {
    try {
      const ex = await UserSchema.findById(userId);
      if (!ex) return "id-notfound";
      const { n, ok, deletedCount } = await UserSchema.
      deleteOne({ _id: userId,});
      return true;
    } 
    catch (err) {
      console.log("user:deleteUser:error:\n"+ err);
      return null;
    }
  }

  public async detailUser(userId: String) {
    try {
      const user = await UserSchema.findById(userId);
      if (!user) return "id-notfound";
      return user;
    } 
    catch (err) {
      console.log("user:detailUser:error:\n"+ err);
      return null;
    }
  }
  
  public async getHeightAndWeight(userId: any) {
    let user:any;
    try {      
        user = await UserSchema.findById(userId);
        const { bmi, height, weight } = user;
        if (!user) return "empty";
        return { bmi, height, weight };
    } catch (err) {
      console.log("user:getHeightAndWeight:error:\n"+ err);
      return null;
    }
  }







  public async  AddPhotos(object:any,userId:any) {
    const user = await UserSchema.findById(userId);
    if (user && user.photos != null  ) {
      object.photos.forEach((e: any) => {
        if (user.photos != undefined)
          
          user.photos.photosUrl.push(e);
         
      });
      user.markModified("photos")
      await user.save()
      return true;
    
    }
    else {
      return false;
    }
  }

public async listUser(query: any) {
    let user:any;
    try {
      const page= query.page||"1"
      const  perPage = parseInt(page) || 10
      var pagination = {
      limit: perPage ,
      skip:perPage * (page - 1)
    }
      user = await UserSchema.find({}) 
      if (!user) {
        return "empty";
      }
      return user;
    } 
    catch (err) {
      console.log("user:listUser:error:\n"+ err);
      return null;
    }
  }
}