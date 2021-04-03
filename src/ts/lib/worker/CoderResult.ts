import {value} from "../values/ValueType";
import {Mode} from "./Mode";

export type CoderInput = string | CoderResult;
export type CoderOutput = CoderResult & {
    score: number
}

export type CoderResult = {
    input: CoderInput,
    mode: Mode,
    coder: string,
    vars: value[],
    output: string
};
