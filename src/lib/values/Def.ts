import {ValueType} from "./ValueType";

/**
 * Argument definition
 */
export abstract class Def {
    /**
     * Name of the argument.
     */
    readonly name: string;

    /**
     * Type of the argument.
     */
    readonly type: ValueType;

    protected constructor(name: string, type: ValueType) {
        this.name = name;
        this.type = type;
    }
}
