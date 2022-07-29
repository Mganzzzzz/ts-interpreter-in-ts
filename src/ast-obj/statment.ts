import {CompilerObject} from "../build-in/compiler-object";
import {Token} from "../build-in/token";


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
