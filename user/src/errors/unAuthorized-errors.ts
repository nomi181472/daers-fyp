import { CustomError } from "./custom-error";
export class UnAuthorizedError extends CustomError {
  statusCode = 401;
  constructor() {
    super("not authorized");
    Object.setPrototypeOf(this, UnAuthorizedError.prototype);
  }
  serializeErrors() {
    return [{ message: "not authorized" }];
  }
}
