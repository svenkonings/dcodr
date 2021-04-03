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

    /**
     * Returns whether this coder is applicable to the specified input and arguments.
     *
     * @param input the input
     * @param args the arguments
     */
    applicable(input: string, ...args: optString[]): boolean {
        // One of the conversion checks failed
        return !(this.convertAndCheckArgs(input, ...args) instanceof Error);
    }

    /**
     * Encodes the input using the specified arguments.
     * Returns the encoded input, or a string specifying the check that failed.
     *
     * @param input the input
     * @param args the arguments
     */
    encode(input: string, ...args: optString[]): string {
        const vars = this.convertAndCheckArgs(input, ...args);
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
        const vars = this.convertAndCheckArgs(input, ...args);
        if (vars instanceof Error) {
            return vars.message;
        }
        return this._decode(input, ...vars);
    }

    abstract _decode(input: string, ...vars: optValue[]): string;

    /**
     * Checks and converts the specified input and arguments.
     * The arguments are converted to the types specified by this coder.
     * Returns the converted arguments if the conversion succeeds and all checks pass,
     * or an Error specifying the conversion or check that failed.
     *
     * @param input the input
     * @param args the arguments
     */
    convertAndCheckArgs(input: string, ...args: optString[]): optValue[] | Error {
        const vars = this.convertArgs(...args);
        if (vars instanceof Error) {
            return vars
        }
        const checks = this.checkVars(input, ...vars);
        if (checks instanceof Error) {
            return checks;
        }
        return vars;
    }

    /**
     * Converts the specified arguments.
     * The arguments are converted to the types specified by this coder.
     * Returns the converted arguments if the conversion succeeds,
     * or an Error specifying the conversion that failed.
     *
     * @param args the arguments
     */
    convertArgs(...args: optString[]): optValue[] | Error {
        const minLength = this.varDefs.length
        const maxLength = this.varDefs.length + this.optionDefs.length;
        if (args.length < minLength) {
            return Error(`Not enough arguments: expected ${minLength}-${maxLength}, received ${args.length}`);
        }
        if (args.length > maxLength) {
            return Error(`Too many arguments: expected ${minLength}-${maxLength}, received ${args.length}`);
        }
        const vars: optValue[] = Array(args.length)
        for (let i = 0; i < args.length; i++) {
            const arg = args[i];
            const def = i < minLength ? this.varDefs[i] : this.optionDefs[i - minLength];
            const convertedArg = Coder.convertType(arg, def);
            if (convertedArg instanceof Error) {
                return convertedArg;
            }
            vars[i] = convertedArg;
        }
        return vars;
    }

    /**
     * Converts the argument to the type specified by the given definition.
     * Return the converted argument if the conversion succeeds,
     * or an Error specifying why the conversion failed.
     *
     * @param arg the argument
     * @param def the definition
     */
    static convertType(arg: optString, def: Def): optValue | Error {
        if (arg === undefined) {
            return undefined;
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

    /**
     * Checks the specified input and variables.
     * Returns an Error if one of the checks fails.
     *
     * @param input the input
     * @param vars the variables
     */
    checkVars(input: string, ...vars: optValue[]): Error | undefined {
        if (input.length === 0) {
            return Error("Input is empty");
        }
        for (let i = 0; i < this.varDefs.length; i++) {
            if (vars[i] === undefined) {
                return Error(`[${this.varDefs[i].name}] Missing variable`);
            }
        }
        return this._checkVars(input, ...vars);
    }

    abstract _checkVars(input: string, ...vars: optValue[]): Error | undefined;
}
