import {optValue, ValueType} from "../values/ValueType";
import {VarDef} from "../values/VarDef";
import {OptionDef} from "../values/OptionDef";
import {optString} from "../util/types";
import {Def} from "../values/Def";

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
     * The definitions of the options used by this coder.
     */
    abstract readonly optionDefs: OptionDef[];

    // defs(): Def[] {
    //     return Array<Def>().concat(this.varDefs, this.optionDefs)
    // }

    /**
     * Returns whether this coder is applicable to the specified input and arguments.
     *
     * @param input the input
     * @param args the arguments
     */
    applicable(input: string, ...args: optString[]): boolean {
        // One of the conversion checks failed
        return !(this.convertArgs(input, ...args) instanceof Error);
    }

    /**
     * Encodes the input using the specified arguments.
     * Returns the encoded input, or a string specifying the check that failed.
     *
     * @param input the input
     * @param args the arguments
     */
    encode(input: string, ...args: optString[]): string {
        const vars = this.convertArgs(input, ...args);
        if (vars instanceof Error) {
            return vars.message;
        }
        return this._encode(input, ...vars);
    }

    abstract _encode(input: string, ...vars: optValue[]): string;

    /**
     * Decodes the input using the specified arguments.
     * Returns the decoded input, or a string specifying the check that failed.
     *
     * @param input the input
     * @param args the arguments
     */
    decode(input: string, ...args: optString[]): string {
        const vars = this.convertArgs(input, ...args);
        if (vars instanceof Error) {
            return vars.message;
        }
        return this._decode(input, ...vars);
    }

    abstract _decode(input: string, ...vars: optValue[]): string;

    /**
     * Checks and converts the specified input and arguments.
     * The arguments are converted to the types specified by the {@link varDefs} of this coder.
     * Returns the converted arguments if all checks pass, or a string specifying the check that failed.
     *
     * @param input the input
     * @param args the arguments
     */
    convertArgs(input: string, ...args: optString[]): optValue[] | Error {
        if (input.length === 0) {
            return Error("Input is empty");
        }
        const varLength = this.varDefs.length
        if (args.length < varLength) {
            return Error(`Not enough arguments: minimum ${varLength}, received ${args.length}`);
        }
        const defsLength = this.varDefs.length + this.optionDefs.length;
        if (args.length > defsLength) {
            return Error(`Too many arguments: maximum ${defsLength}, received ${args.length}`);
        }
        const vars: optValue[] = Array(args.length)
        for (let i = 0; i < args.length; i++) {
            const arg = args[i];
            const def = i < varLength ? this.varDefs[i] : this.optionDefs[i - varLength];
            const convertedArg = Coder.convertType(arg, def);
            if (convertedArg instanceof Error) {
                return convertedArg;
            }
            vars[i] = convertedArg;
        }
        const checks = this._checkArgs(input, ...vars);
        if (checks instanceof Error) {
            return checks;
        }
        return vars;
    }

    static convertType(arg: optString, def: Def): optValue | Error {
        if (arg === undefined) {
            if (def instanceof VarDef) {
                return Error(`[${def.name}] Missing variable`);
            } else {
                return undefined;
            }
        }
        switch (def.type) {
            case ValueType.BOOLEAN:
                const lowerCase = arg.toLowerCase()
                if (lowerCase === "true") {
                    return true;
                } else if (lowerCase === "false") {
                    return false;
                } else {
                    return Error(`[${def.name}] Cannot parse boolean: ${arg}`);
                }
            case ValueType.INTEGER:
                if (/^-?\d+$/.test(arg)) {
                    return +arg;
                } else {
                    return Error(`[${def.name}] Cannot parse number: ${arg}`);
                }
            case ValueType.STRING:
                if (arg.length === 0) {
                    return Error(`[${def.name}] Empty value`);
                }
                return arg;
            default:
                return Error(`[${def.name}] Unknown variable type ${def.type}`);
        }
    }

    abstract _checkArgs(input: string, ...vars: optValue[]): Error | undefined;
}
