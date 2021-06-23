import { CustomError } from "./custom-error";
export class UnAuthorizedError extends CustomError {
  statusCode = 401;
  constructor(public str: string = "not authorized") {
    super(str);
    Object.setPrototypeOf(this, UnAuthorizedError.prototype);
  }
  serializeErrors() {
    return [{ message: this.str }];
  }
}
