import {Statement} from "./statment";
import {Token} from "../tokenizer";

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
