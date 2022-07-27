import {Statement} from "./statment";

export class FunctionBody extends Statement {
    statement: Statement[]

    constructor(statement: Statement[]) {
        super();
        this.statement = statement
    }
    toString() {
        return this.statement
    }

}
