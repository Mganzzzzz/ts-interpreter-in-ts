import {Statement} from "./ast-obj/statment";
import {Tokenizer} from "./tokenizer";

let source: string[] = [
    'function', 'sayHello', '(', ')', '{',
    'println', '(', '"', 'hello', '"', ')',
    '}',
    'sayHello', '(', ')',
]

let position = 0



class FunctionCall extends Statement {
    funcName: string

    constructor(statement: Statement[]) {
        super();
    }
}


function main() {
    const s = `function sayHello() {
                    println("hello")
                }
                sayHello()
                `
    const tokenizer = new Tokenizer(s)
    let tokens = tokenizer.parse()
    console.log('debug tokens', tokens)
    // const r = parseProg(source)
    // console.log('debug r', JSON.stringify(r))
}

main()
