import { CustomError } from "./custom-error";

export class UnknownRouteError extends CustomError {
  statusCode = 400;
  constructor() {
    super("Route not Found");
    Object.setPrototypeOf(this, UnknownRouteError.prototype);
  }
  serializeErrors() {
    return [{ message: "unkown route not found" }];
  }
}
