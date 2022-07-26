import {AST} from "eslint";
import Token = AST.Token;
import {Statement} from "./ast-obj/statment";
import {FunctionDecl} from "./ast-obj/function-decl";
import {FunctionBody} from "./ast-obj/function-body";
import {FunctionCall} from "./ast-obj/function-call";

export class AstParser {
    tokenList: Token[]
    index: number

    constructor(tokenList: Token[]) {
        this.tokenList = tokenList
    }

    next() {
        if (this.index < this.tokenList.length) {
            this.index++
        }
    }

    get token() {
        return this.token[this.index]
    }

    /**
     * Date:
     * Time:
     *  functionDecl: "function" identifier "(" ")" functionBody
     */
    parseFuncDecl(): FunctionDecl | null {
        let ret: Statement[] = []
        let funcName
        while (true) {
            let token = this.token
            if (token === 'function') {
                this.next()

                funcName = this.token
                ret.push(funcName)
                this.next()
                continue
            } else if (token === '(') {
                console.log('debug token', token)
                this.next()
                this.next()
                continue
            } else if (token === '{') {
                console.log('debug token', token)
                let body = this.parseFuncBody()
                if (body) {
                    ret.push(body)
                }
                continue
            } else if (token === '}') {
                this.next()
                break
            } else {
                return null
            }
        }
        return new FunctionDecl(ret)
    }

    /**
     * Date:
     * Time:
     *  functionBody: "{" functionCall "}"
     */
    parseFuncBody(): FunctionBody | null {
        let ret = []
        while (true) {
            let token = this.token
            if (token === '{') {
                this.next()
                let body = this.parseFuncCall()
                if (body) {
                    ret.push(body)
                }
            } else if (token === '}') {
                // position--
                break
            }
        }
        return new FunctionBody(ret)
    }

    /**
     * Date:
     * Time:
     * parseFuncCall: identifier "(" params? ")"
     * params: string  ","
     */
    parseFuncCall(): FunctionCall {
        let ret = []
        let funcName = this.token
        ret.push(funcName)
        this.next()
        if (this.token === '(') {
            this.next()
            while (this.token !== ')') {
                let token = this.token
                if (token === '"' || token === "'") {
                } else if (token === ',') {
                } else {
                    ret.push(token)
                }
                this.next()
            }
            this.next()
        } else {
            return null
        }
        return new FunctionCall(ret)
    }

    parseProg(source) {
        const m: Statement[] = []
        let n: Statement | null | void = null
        while (true) {
            n = this.parseFuncDecl()
            if (n) {
                m.push(n)
                continue
            }
            n = this.parseFuncCall()
            if (n) {
                m.push(n)
                continue
            }
            if (n == null) {
                break
            }
            if (!this.token) {
                break
            }
        }
        return m
    }


}
