import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
interface UserPayLoad {
  id: string;
  email: string;
}
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayLoad;
    }
  }
}

/*export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    return next();
  }
  try {
    const payload = jwt.verify(req.session.jwt, "noman") as UserPayLoad;
    req.currentUser = payload;
  } catch (err) {}
  next();
};
*/

// export const currentUser = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const { cookie } = req.headers;
//   if (!cookie?.substring(4, cookie.length)) {
//     //console.log(cookie?.substring(4, cookie.length));

//     return next();
//   }

//   try {
//     const token = cookie?.substring(4, cookie.length);
//     const payload = jwt.verify(token, "noman") as UserPayLoad;
//     req.currentUser = payload; //will be process.environment variable
//   } catch (err) {}
//   next();
// };
export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //console.log(req.session);
  if (!req.session?.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify(req.session.jwt, "noman") as UserPayLoad;
    req.currentUser = payload;
  } catch (err) {}

  next();
};
