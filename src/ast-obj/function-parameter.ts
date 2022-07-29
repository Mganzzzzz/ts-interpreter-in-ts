import {Statement} from "./statment";
import {Token} from "../build-in/token";

export class FunctionParameter extends Statement {
    parameter: Token[]

    constructor(parameter: Token[]) {
        super();
        this.parameter = parameter
    }

    toString(): string {

        return `[${this.parameter.toString()}]`
    }
}
