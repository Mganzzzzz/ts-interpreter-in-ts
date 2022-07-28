import * as util from "util";

export class CompilerObject {
    private prototype: CompilerObject;
    public objName: string;

    constructor() {
        this.prototype = Object.getPrototypeOf(this)
        this.objName = this.constructor.name
    }

    [util.inspect.custom](depth, opts) {
        return this.str()
    }

    toString() {
        return this.str()
    }

    str(): string {
        const s = this.toString()
        const inspect = s || this.prototype.constructor.name
        return ` < ${this.objName} ${inspect}> `
    }
}
