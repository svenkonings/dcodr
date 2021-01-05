import {values, ValueType} from "./ValueType";
import {Def} from "./Def";

/**
 * Variable definition.
 */
export class VarDef extends Def {

    /**
     * List of values that can be used for brute-forcing.
     * Can be empty.
     */
    readonly bruteForceValues: values;

    constructor(name: string, type: ValueType, ...bruteForceValues: values) {
        super(name, type);
        this.bruteForceValues = bruteForceValues;
    }

    hasBruteForceValues(): boolean {
        return this.bruteForceValues.length > 0;
    }

    // Correct method should be selected based on type

    getBoolBruteForceValues(): boolean[] {
        return this.bruteForceValues as boolean[]
    }

    getIntBruteForceValues(): number[] {
        return this.bruteForceValues as number[]
    }

    getStringBruteForceValues(): string[] {
        return this.bruteForceValues as string[]
    }
}

export const varDef = (name: string, type: ValueType, ...bruteForceValues: values) => {
    return new VarDef(name, type, ...bruteForceValues);
}
