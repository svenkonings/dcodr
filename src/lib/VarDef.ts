import {variable, VarType} from "./VarType";

/**
 * Variable definition.
 */
export class VarDef {
    /**
     * Name of the variable.
     */
    readonly name: string;

    /**
     * Type of the variable.
     */
    readonly type: VarType;

    /**
     * Default values of the variable.
     * Empty for no defaults.
     * Default values are used for brute-force decoding/encoding.
     * First default value is used as standard value when no value is specified.
     */
    readonly defaultValues: variable[];

    constructor(name: string, type: VarType, ...defaultValues: variable[]) {
        this.name = name;
        this.type = type;
        this.defaultValues = defaultValues;
    }

    hasDefault(): boolean {
        return this.defaultValues.length > 0;
    }

    getFirstDefault(): variable {
        return this.defaultValues[0]
    }
}
