import {Statement} from "./ast-obj/statment";
import {isAlpha, isNumber, isSpace} from "./string-utils";
import {CompilerObject} from "./build-in/compiler-object";

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

export enum TokenType {
    Identifier = 'Identifier',
    KeyWord = 'KeyWord', //
    LeftBracket = 'LeftBracket', // [
    RightBracket = 'RightBracket', // ]
    LeftParenthesis = 'LeftParenthesis', // (
    RightParenthesis = 'RightParenthesis', // )
    LeftBraces = 'LeftBraces', // {
    RightBrace = 'RightBrace', // }
    SingleQuotation = 'SingleQuotation', // '
    DoubleQuotation = 'DoubleQuotation', // "
    DoubleSlashes = 'DoubleSlashes', // //
    SingleSlash = 'SingleSlash', // /
    Semicolon = 'Semicolon',  // :
    Comma = 'Comma',  // ,
    Space = 'Space',  // ,
    StringLiteral = 'StringLiteral', // string
}

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
