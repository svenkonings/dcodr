import {Mode} from "./Mode";
import {Step} from "./Step";
import {BRUTE_FORCE} from "../coders/Coders";

export type WorkerInput = {
    input: string,
    mode: Mode,
    steps: Step[]
};

export function hasBruteForce(message: WorkerInput): boolean {
    for (const step of message.steps) {
        if (step.coder === BRUTE_FORCE) {
            return true;
        }
        for (const arg of step.args) {
            if (arg === undefined) {
                return true;
            }
        }
    }
    return false;
}
