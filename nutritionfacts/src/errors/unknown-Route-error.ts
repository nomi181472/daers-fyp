import { CustomError } from "./custom-error";

export class UnknownRouteError extends CustomError {
  statusCode = 400;
  constructor(public str = "unkown route not found") {
    super("Route not Found");
    Object.setPrototypeOf(this, UnknownRouteError.prototype);
  }
  serializeErrors() {
    return [{ message: this.str }];
  }
}
