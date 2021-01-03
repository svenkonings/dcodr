import {VarDef} from "./VarDef";
import {variable, VarType} from "./VarType";

/**
 * Parent class for all encoder/decoder classes.
 */
export abstract class Coder {

    /**
     * The name of this coder.
     */
    abstract readonly name: string;

    /**
     * The definitions of the variables used by this coder.
     */
    abstract readonly varDefs: VarDef[];

    /**
     * Returns whether this coder is applicable to the specified input and arguments.
     *
     * @param input the input
     * @param args the arguments
     */
    applicable(input: string, ...args: string[]): boolean {
        // One of the conversion checks failed
        return typeof this.convertArgs(input, ...args) === "string";
    }

    /**
     * Encodes the input using the specified arguments.
     * Returns the encoded input, or a string specifying the check that failed.
     *
     * @param input the input
     * @param args the arguments
     */
    encode(input: string, ...args: string[]): string {
        const vars = this.convertArgs(input, ...args);
        if (typeof vars === "string") {
            return vars;
        }
        return this._encode(input, ...vars);
    }

    abstract _encode(input: string, ...vars: variable[]): string;

    /**
     * Decodes the input using the specified arguments.
     * Returns the decoded input, or a string specifying the check that failed.
     *
     * @param input the input
     * @param args the arguments
     */
    decode(input: string, ...args: string[]): string {
        const vars = this.convertArgs(input, ...args);
        if (typeof vars === "string") {
            return vars;
        }
        return this._decode(input, ...vars);
    }

    abstract _decode(input: string, ...vars: variable[]): string;

    /**
     * Checks and converts the specified input and arguments.
     * The arguments are converted to the types specified by the {@link varDefs} of this coder.
     * Returns the converted arguments if all checks pass, or a string specifying the check that failed.
     *
     * @param input the input
     * @param args the arguments
     */
    convertArgs(input: string, ...args: string[]): variable[] | string {
        if (input.length === 0) {
            return "Input is empty";
        }
        if (this.varDefs.length !== args.length) {
            return `Unexpected number of arguments: expected ${this.varDefs.length}, received ${args.length}`;
        }
        const vars: variable[] = new Array(args.length)
        for (let i = 0; i < args.length; i++) {
            const arg = args[i];
            const varDef = this.varDefs[i];
            switch (varDef.type) {
                case VarType.BOOLEAN:
                    const lowerCase = arg.toLowerCase()
                    if (lowerCase === "true") {
                        vars[i] = true;
                    } else if (lowerCase === "false") {
                        vars[i] = false;
                    } else {
                        return `[${varDef.name}] Cannot parse boolean: ${arg}`;
                    }
                    break;
                case VarType.INTEGER:
                    if (/^-?\d+$/.test(arg)) {
                        vars[i] = +arg
                    } else {
                        return `[${varDef.name}] Cannot parse number: ${arg}`;
                    }
                    break;
                case VarType.STRING:
                    if (arg.length === 0) {
                        return `[${varDef.name}] Missing value`;
                    }
                    vars[i] = arg;
                    break;
                default:
                    return `[${varDef.name}] Unknown variable type ${varDef.type}`;
            }
        }
        const checks = this._checkArgs(input, ...vars);
        if (checks !== undefined) {
            return checks;
        }
        return vars;
    }

    abstract _checkArgs(input: string, ...vars: variable[]): string | undefined;
}
