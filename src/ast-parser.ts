import {Statement} from "./ast-obj/statment";
import {FunctionDecl} from "./ast-obj/function-decl";
import {Token, TokenType} from "./tokenizer";
import {FunctionBody} from "./ast-obj/function-body";
import {FunctionCall} from "./ast-obj/function-call";
import {FunctionParameter} from "./ast-obj/function-parameter";
import {Program} from "./ast-obj/program";

export class AstParser {
    tokenList: Token[]
    index: number = 0
    program: Program
    statment: Statement[]

    constructor(tokenList: Token[]) {
        this.tokenList = tokenList
    }

    next() {
        if (this.index < this.tokenList.length) {
            this.index++
        }
    }

    get token(): Token | null {
        return this.tokenList[this.index]
    }

    /**
     * Date:
     * Time:
     *  functionDecl: "function" identifier "(" ")" functionBody
     */
    parseFuncDecl(): FunctionDecl | null {
        let funcBody: FunctionBody
        let token = this.token
        let funcName: Token

        if (!token) {
            return null
        }

        if (token.type === TokenType.Identifier && token.raw === 'function') {
            this.next()
            funcName = this.token
            this.next()
            this.next()
            funcBody = this.parseFuncBody()
        } else {
            return null
        }
        return new FunctionDecl(funcBody, funcName)
    }

    /**
     * Date:
     * Time:
     *  functionBody: "{" functionCall "}"
     */
    parseFuncBody(): FunctionBody | null {
        const sm: Statement[] = []
        while (this.token.type !== TokenType.RightBrace) {
            let n = this.parseFuncCall()
            if (n) {
                sm.push(n)
                continue
            }
            this.next()
        }
        this.next()
        return new FunctionBody(sm)
    }

    /**
     * Date:
     * Time:
     * parseFuncCall: identifier "(" params? ")"
     * params: string  ","
     */
    parseFuncCall(): FunctionCall {
        if (this.token.type !== TokenType.Identifier) {
            return null
        }
        let funcName = this.token
        let params: FunctionParameter | null
        this.next()
        const t = this.token
        if (t.type === TokenType.LeftParenthesis) {
            params = this.parseFuncParams()
        } else {
            throw new Error('function should call with ()')
        }
        const ref = this.findFunctionDecl()
        const r = new FunctionCall(funcName, ref, params)
        return r
    }

    parseFuncParams() {
        let params = []
        // if(this.token.type !== TokenType.LeftParenthesis) {
        //     return null
        // }
        // this.next()
        while (this.token.type !== TokenType.RightParenthesis) {
            if (this.token.type == TokenType.LeftParenthesis) {
                this.next()
            } else if (this.token.type == TokenType.StringLiteral) {
                params.push(this.token)
                this.next()
            } else if (this.token.type == TokenType.Comma) {
                this.next()
            } else if (this.token.type == TokenType.SingleQuotation || this.token.type == TokenType.DoubleQuotation) {
                const s = this.parseStringLiteral()
                params.push(s)
            } else {
                throw new Error('function Parameter parse error')
            }
        }
        return new FunctionParameter(params)
    }

    parseStringLiteral() {
        let s = ''
        if (this.token.type == TokenType.SingleQuotation) {
            this.next()
            while (this.token.type !== TokenType.SingleQuotation) {
                s += this.token.raw
                this.next()
            }
            this.next()
            return new Token(s, TokenType.Identifier)

        } else if (this.token.type == TokenType.DoubleQuotation) {
            this.next()
            while (this.token.type !== TokenType.DoubleQuotation) {
                s += this.token.raw
                this.next()
            }
            this.next()
            return new Token(s, TokenType.Identifier)
        }
        return null
    }

    findFunctionDecl(): FunctionDecl | null {
        let ret = null
        this.statment.forEach(n => {
            if (n instanceof FunctionDecl) {
                ret = n
            }
        })
        return ret
    }

    resolveFuncCallRef() {
        let ret = null
        this.statment.forEach(n => {
            if (n instanceof FunctionCall) {
                if (n.funcRef === null) {
                    n.funcRef = this.findFunctionDecl()
                }
            }
        })
        return ret

    }

    parseProgram(): Program | null {
        const m: Statement[] = []
        this.statment = m
        let n: Statement | null | void = null
        while (true) {
            if (this.token.type === TokenType.Space) {
                this.next()
                continue
            }
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

            if (n === null) {
                break
            }
        }
        const prog = new Program(m)
        this.resolveFuncCallRef()
        this.program = prog

        return prog
    }


}
