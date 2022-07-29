import {CompilerObject} from "./compiler-object";
import {TokenType} from "./type";

export class Token extends CompilerObject {
    public type: TokenType
    public raw: string

    constructor(raw, type: TokenType) {
        super();
        this.raw = raw
        this.type = type
    }

    toString(): string {
        return ` ${this.raw} ${this.type}`
    }
}
