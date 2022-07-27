import {Statement} from "./statment";
import {FunctionBody} from "./function-body";
import {Token} from "../tokenizer";

export class FunctionDecl extends Statement {
    funcName: Token
    funcBody: FunctionBody

    constructor(statement: FunctionBody, funcName: Token) {
        super();
        this.funcBody = statement
        this.funcName = funcName
    }
}
