import {Program} from "./ast-obj/program";
import {Statement} from "./ast-obj/statment";
import {FunctionBody} from "./ast-obj/function-body";
import {FunctionCall} from "./ast-obj/function-call";
import {strictEqual} from "assert";
import {println} from "./build-in/build-func";
import {FunctionDecl} from "./ast-obj/function-decl";
import {stat} from "fs";
import {getRemainingFlags} from "@nestjs/cli/lib/utils/remaining-flags";

export class ProgramExec {
    program: Program

    constructor(program: Program) {
        this.program = program

    }

    exec() {
        this.dfs()
    }

    private dfs() {
        for (const statement of this.program.statement) {
            if (statement instanceof FunctionDecl) {
                //
            } else if (statement instanceof FunctionCall) {
                this.execFuncCall(statement)
            }
        }
    }

    isBuildIn(func: FunctionCall) {
        const buildInFuncList = [
            'println'
        ]
        if (buildInFuncList.find(n => n === func.funcName.raw)) {
            return true
        }
        return false
    }


    execFuncCall(statement: FunctionCall) {

        const parameter = statement.functionParameter.parameter
        const args = parameter.map(n => n.raw)
        if (this.isBuildIn(statement)) {
            return println.call(null, ...args)
        } else {
            const ref = statement.funcRef
            const funcBody = ref.funcBody
            for (const statement1 of funcBody.statement) {
                let x = statement1 as FunctionCall
                this.execFuncCall(x)
            }
        }
    }
}
