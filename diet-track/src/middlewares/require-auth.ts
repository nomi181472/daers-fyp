import { Request, Response, NextFunction } from "express";
import { UnAuthorizedError } from "../errors/unAuthorized-errors";
export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //console.log("current required auth running");
  if (!req.currentUser) {
    throw new UnAuthorizedError();
  }
  next();
};
