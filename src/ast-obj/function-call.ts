import {Statement} from "./statment";
import {Token} from "../tokenizer";
import {FunctionBody} from "./function-body";
import {FunctionParameter} from "./function-parameter";

export class FunctionCall extends Statement {
    funcName: Token
    FunctionParameter: FunctionParameter

    constructor(funcName: Token, funcParams?: FunctionParameter) {
        super();
        this.funcName = funcName
        this.FunctionParameter = funcParams
    }
}
