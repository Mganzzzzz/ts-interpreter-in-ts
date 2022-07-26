import {Tokenizer} from "../tokenizer";



export class Statement {
    token: Tokenizer

    constructor(token?: Tokenizer) {
        this.token = token
    }
}
