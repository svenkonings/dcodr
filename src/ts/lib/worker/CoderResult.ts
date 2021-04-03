import {optValue} from "../values/ValueType";
import {Mode} from "./Mode";

export type CoderInput = string | CoderResult;

export type CoderResult = {
    input: CoderInput,
    mode: Mode,
    coder: string,
    vars: optValue[],
    output: string
};
