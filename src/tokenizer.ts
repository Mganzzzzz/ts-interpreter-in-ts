import {Statement} from "./ast-obj/statment";
import {isAlpha, isNumber, isSpace} from "./string-utils";

export class Tokenizer {
    index: number = 0
    source: string
    i: number = 0

    constructor(source: string) {
        this.source = source;
    }

    get letter() {
        return this.source[this.i]
    }

    parse():Token[] {
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
                this.nextLetter()
                continue
            }

            c = this.parseQuotation()
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
        const ret = new Token(s, TokenType.TypeString)
        return ret
    }


    private parseQuotation() {
        let s = this.letter
        if (s === "'") {
            this.nextLetter()
            return new Token(s, TokenType.SingleQuotation)
        } else if (s === '"') {
            this.nextLetter()
            return new Token(s, TokenType.DoubleQuotation)
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

enum TokenType {
    TypeString = 'TypeString',
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
}

export class Token {
    type: TokenType
    raw: string

    constructor(raw, type: TokenType) {
        this.raw = raw
        this.type = type
    }
}
