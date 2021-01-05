import {optString} from "../util/types";

export type WorkerMessage = {
    coder: string,
    mode: "encode" | "decode",
    input: string,
    args: optString[];
}
