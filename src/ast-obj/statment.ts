import {Token, Tokenizer} from "../tokenizer";


export class Statement {
    token: Token

    constructor(token: Token = null) {
        this.token = token
    }
}
