import {value, ValueType} from "./ValueType";
import {Def} from "./Def";

/**
 * Option definition.
 */
export class OptionDef extends Def {

    /**
     * Default values of the option.
     */
    readonly defaultValue: value;

    constructor(name: string, type: ValueType, defaultValue: value) {
        super(name, type);
        this.defaultValue = defaultValue;
    }

    // Correct method should be selected based on type

    getBoolDefault(): boolean {
        return this.defaultValue as boolean;
    }

    getIntDefault(): number {
        return this.defaultValue as number;
    }

    getStringDefault(): string {
        return this.defaultValue as string;
    }
}

export const optionDef = (name: string, type: ValueType, defaultValue: value) => {
    return new OptionDef(name, type, defaultValue);
}
