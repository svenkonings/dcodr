import {optString} from "../util/types";

// TODO: Steps args should be split up in vars and settings
export type Step = {
    coder: string,
    args: optString[]
}

export type LinkedStep = Step & {
    nextStep?: Step
}

/**
 * Converts array of steps to LinkedStep. Array should not be empty.
 * @param steps array of steps
 */
export function linkedStep(steps: Step[]): LinkedStep {
    let step: LinkedStep | undefined = undefined;
    for (let i = steps.length - 1; i >= 0; i--) {
        step = {
            coder: steps[i].coder,
            args: steps[i].args,
            nextStep: step
        }
    }
    return step as LinkedStep;
}

// FIXME: Args with bruteforcevalues should be brute forcable in UI (when selecting coder)
// FIXME: Settings should have reset to default button in UI
// FIXME: Preview bruteforcevalues of arg (when selecting coder)
