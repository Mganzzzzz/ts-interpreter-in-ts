import {Statement} from "./ast-obj/statment";
import {Tokenizer} from "./tokenizer";
import {AstParser} from "./ast-parser";

function main() {
    const s = `function sayHello() {
                    println("hello")
                }
                sayHello()
                `
    const tokenizer = new Tokenizer(s)
    let tokens = tokenizer.parse()
    const ast = new AstParser(tokens)
    const astTree=  ast.parseProgram()
    console.log(astTree);
    // const r = parseProg(source)
    // console.log('debug r', JSON.stringify(r))
}

main()
