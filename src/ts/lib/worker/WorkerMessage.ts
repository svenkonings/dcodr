import {Mode} from "./Mode";
import {Step} from "./Step";

export type WorkerMessage = {
    input: string,
    mode: Mode,
    steps: Step[]
};
