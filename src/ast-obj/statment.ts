import {Token, Tokenizer} from "../tokenizer";
import {CompilerObject} from "../build-in/compiler-object";


export class Statement extends CompilerObject {
    token: Token

    constructor(token: Token = null) {
        super();
        this.token = token
    }

    // toString(): string {
    //     return
    // }
}
