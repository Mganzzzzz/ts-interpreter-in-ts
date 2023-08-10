import * as fs from 'fs'
import * as path from 'path'
import {Tokenizer} from "./tokenizer";
import {AstParser} from "./ast-parser";
import {ProgramExec} from "./program-exec";
import { log } from './utils/help';

function main() {
    const s = fs.readFileSync(path.join(path.dirname(__filename), './source1.txt'), {encoding: "utf-8"})
    const tokenizer = new Tokenizer(s)
    let tokens = tokenizer.parse()
    log('debug tokens', tokens)
    const ast = new AstParser(tokens)
    const astTree = ast.parseProgram()
    const programExec = new ProgramExec(astTree)
    programExec.exec()
}

// class A extends CompilerObject{
//     toString(): string {
//         return 'a'
//     }
// }
// const a = new A()
// const a1 = new A()
// var c:A[] = [a, a1]
// console.log('debug c', c)

main()
