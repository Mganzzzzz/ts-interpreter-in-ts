import {Statement} from "./statment";
import {Token} from "../tokenizer";
import {FunctionBody} from "./function-body";
import {FunctionParameter} from "./function-parameter";
import {FunctionDecl} from "./function-decl";

export class FunctionCall extends Statement {
    funcName: Token
    functionParameter: FunctionParameter
    funcRef: FunctionDecl

    constructor(funcName: Token, funcRef: FunctionDecl, funcParams?: FunctionParameter,) {
        super();
        this.funcName = funcName
        this.funcRef = funcRef
        this.functionParameter = funcParams
    }


    toString(): string {
        return ` < ${this.objName} ${this.funcName.raw} ${this.functionParameter} > `
    }
}
