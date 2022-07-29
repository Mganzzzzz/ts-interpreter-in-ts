import {Statement} from "./statment";
import {FunctionBody} from "./function-body";
import {Token} from "../build-in/token";

export class FunctionDecl extends Statement {
    funcName: Token
    funcBody: FunctionBody

    constructor(statement: FunctionBody, funcName: Token) {
        super();
        this.funcBody = statement
        this.funcName = funcName
    }
    toString(): string {
        return ` < ${this.objName} ${this.funcName.raw} > `
    }
}
