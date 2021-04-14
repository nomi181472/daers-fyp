import { CustomError } from "./custom-error";


export class DatabaseConnectionError extends CustomError{
reason="database Error";
statusCode=500;
constructor(){
    super("database Error");
    Object.setPrototypeOf(this,DatabaseConnectionError.prototype);
}
serializeErrors(){
    return [{message:this.reason}];
}
}