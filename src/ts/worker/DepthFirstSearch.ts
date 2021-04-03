import {CoderInput, CoderResult} from "../lib/worker/CoderResult";
import {linkedStep, LinkedStep} from "../lib/worker/Step";
import {BRUTE_FORCE, CODERS, getCoder} from "../lib/coders/Coders";
import {Coder} from "../lib/coders/Coder";
import {optValue} from "../lib/values/ValueType";
import {Mode} from "../lib/worker/Mode";
import {hasBruteForce, WorkerInput} from "../lib/worker/WorkerInput";
import {WorkerStatus} from "../lib/worker/WorkerStatus";
import {WorkerOutput} from "../lib/worker/WorkerOutput";

export function resolveSteps(message: WorkerInput): void {
    const postErrors = !hasBruteForce(message);
    resolveCoder(message.input, message.mode, linkedStep(message.steps), postErrors);
    post(WorkerStatus.Done)
}

export function resolveCoder(input: CoderInput, mode: Mode, step: LinkedStep, postErrors: boolean): void {
    if (step.coder === BRUTE_FORCE) {
        for (const coder of CODERS) {
            resolveArguments(input, mode, step, coder, postErrors);
        }
    } else {
        const coder = getCoder(step.coder);
        if (coder === undefined) {
            if (postErrors) {
                post(Error(`Cannot find coder: ${step.coder}`));
            }
            return;
        }
        resolveArguments(input, mode, step, coder, postErrors);
    }
}

function resolveArguments(input: CoderInput, mode: Mode, step: LinkedStep, coder: Coder, postErrors: boolean): void {
    // Convert the arguments
    const convertedVars = coder.convertArgs(...step.args);
    if (convertedVars instanceof Error) {
        if (postErrors) {
            post(convertedVars);
        }
        return;
    }
    // Fill-in brute-force variables
    const possibleVars: optValue[][] = [];
    for (let i = 0; i < convertedVars.length; i++) {
        if (i < coder.varDefs.length && convertedVars[i] === undefined) {
            const bruteForceValues = coder.varDefs[i].bruteForceValues
            if (bruteForceValues.length === 0) {
                if (postErrors) {
                    post(Error(`[${coder.varDefs[i].name}] Missing variable without brute-force values`));
                }
                return;
            } else {
                possibleVars[i] = bruteForceValues;
            }
        } else {
            possibleVars[i] = [convertedVars[i]];
        }
    }

    // Solve all combinations of variables
    resolveVars(input, mode, step, coder, possibleVars, postErrors)
}

function resolveVars(input: CoderInput, mode: Mode, step: LinkedStep, coder: Coder, possibleVars: optValue[][], postErrors: boolean, currentVars: optValue[] = [], column = 0) {
    const lastColumn = column === possibleVars.length - 1
    for (const row of possibleVars[column]) {
        currentVars.push(row);
        if (lastColumn) {
            resolve(input, mode, step, coder, currentVars, postErrors);
        } else {
            resolveVars(input, mode, step, coder, possibleVars, postErrors, currentVars, column + 1)
        }
        currentVars.pop();
    }
}

function resolve(input: CoderInput, mode: Mode, step: LinkedStep, coder: Coder, vars: optValue[], postErrors: boolean): void {
    const inputString = typeof input === "string" ? input : input.output;
    const checks = coder.checkVars(inputString, ...vars);
    if (checks instanceof Error) {
        if (postErrors) {
            post(checks);
        }
        return;
    }
    let output: string;
    switch (mode) {
        case Mode.Encode:
            output = coder._encode(inputString, ...vars);
            break;
        case Mode.Decode:
            output = coder._decode(inputString, ...vars);
            break;
    }
    const result: CoderResult = {
        input: input,
        mode: mode,
        coder: coder.name,
        vars: vars,
        output: output
    }
    if (step.nextStep === undefined) {
        post(result);
    } else {
        resolveCoder(result, mode, step.nextStep, postErrors);
    }
}

function post(message: WorkerOutput): void {
    postMessage(message);
}
