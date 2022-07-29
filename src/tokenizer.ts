import {Statement} from "./ast-obj/statment";
import {Token} from "./build-in/token";

import {isAlpha, isNumber, isSpace} from "./string-utils";
import {CompilerObject} from "./build-in/compiler-object";
import {TokenType} from "./build-in/type";

export class Tokenizer extends CompilerObject {
    index: number = 0
    source: string
    i: number = 0

    constructor(source: string) {
        super();
        this.source = source;
    }

    get letter() {
        return this.source[this.i]
    }

    parse(): Token[] {
        const m: Token[] = []
        let n: Token | null = null
        while (true) {
            if (!this.letter) {
                break
            }
            let c = this.parseWord()
            if (c) {
                m.push(c)
                continue
            }
            if (isSpace(this.letter)) {
                m.push(new Token(' ', TokenType.Space))
                this.nextLetter()
                continue
            }

            c = this.parseStringLiteral()
            if (c) {
                m.push(c)
                continue
            }
            c = this.parseBracket()
            if (c) {
                m.push(c)
                continue
            }

            if (c === null) {
                break
            }
        }
        return m
    }

    nextLetter() {
        this.i++
    }

    private parseWord() {
        let s = ''
        let c = this.letter
        if (!isAlpha(c)) {
            return null
        }
        while (isAlpha(c) || isNumber(c)) {
            s += c
            this.nextLetter()
            c = this.letter
        }
        const ret = new Token(s, TokenType.Identifier)
        return ret
    }

    private parseStringLiteral() {
        let s = this.letter
        let ret = ''
        if (s === "'") {
            this.nextLetter()
            while (this.letter !== "'") {
                ret += this.letter
                this.nextLetter()
            }
            this.nextLetter()
            return new Token(ret, TokenType.StringLiteral)
            // this.nextLetter()
            // return new Token(s, TokenType.SingleQuotation)
        } else if (s === '"') {
            this.nextLetter()
            while (this.letter !== '"') {
                ret += this.letter
                this.nextLetter()
            }
            this.nextLetter()
            return new Token(ret, TokenType.StringLiteral)
        }
        return null
    }

    private parseBracket() {
        let s = this.letter
        let ret = null
        if (s === "(") {
            ret = new Token(s, TokenType.LeftParenthesis)
        } else if (s === ')') {
            ret = new Token(s, TokenType.RightParenthesis)
        } else if (s === '[') {
            ret = new Token(s, TokenType.LeftBracket)
        } else if (s === ']') {
            ret = new Token(s, TokenType.RightBracket)
        } else if (s === '{') {
            ret = new Token(s, TokenType.LeftBraces)
        } else if (s === '}') {
            ret = new Token(s, TokenType.RightBrace)
        }
        if (ret) {
            this.nextLetter()
        }
        return ret
    }
}

