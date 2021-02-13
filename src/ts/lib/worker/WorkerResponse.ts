import {optValue} from "../values/ValueType";
import {optString} from "../util/types";

export type WorkerResponse = {
    coder: string,
    mode: "encode" | "decode",
    input: string,
    args: optString[],
    vars?: optValue[],
    output?: string,
    error?: Error
};
