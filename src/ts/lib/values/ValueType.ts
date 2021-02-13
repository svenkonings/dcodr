export enum ValueType {
    BOOLEAN = "boolean",
    INTEGER = "integer",
    STRING = "string"
}

export type value = boolean | number | string;
export type optValue = value | undefined;
export type values = boolean[] | number[] | string[];
