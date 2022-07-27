import * as fs from 'fs'
import * as path from 'path'
import {Statement} from "./ast-obj/statment";

import {Tokenizer} from "./tokenizer";
import {AstParser} from "./ast-parser";
import {ProgramExec} from "./program-exec";

function main() {
    const s = fs.readFileSync(path.join(path.dirname(__filename), './source1.txt'), {encoding: "utf-8"})
    const tokenizer = new Tokenizer(s)
    let tokens = tokenizer.parse()
    const ast = new AstParser(tokens)
    const astTree = ast.parseProgram()
    const programExec = new ProgramExec(astTree)
    programExec.dfs()

}

main()
