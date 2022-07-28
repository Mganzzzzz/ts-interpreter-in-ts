import * as util from "util";
import * as path from "path";

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
        const filename = path.basename(__filename)
        const mod = filename.split('.')[0]
        const prototype = Object.getPrototypeOf(this)
        const superName = prototype.__proto__.constructor.name
        const name = this.constructor.name
        return `<${mod}.${name} ${superName}>`
    }
}
