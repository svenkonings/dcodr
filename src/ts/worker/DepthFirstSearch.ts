import {CoderInput, CoderResult} from "../lib/worker/CoderResult";
import {LinkedStep} from "../lib/worker/Step";
import {BRUTE_FORCE, CODERS, getCoder} from "../lib/coders/Coders";
import {Coder} from "../lib/coders/Coder";
import {optValue} from "../lib/values/ValueType";
import {cartesian} from "../lib/util/functions";
import {Mode} from "../lib/worker/Mode";

export function resolveCoder(input: CoderInput, mode: Mode, step: LinkedStep): void {
    if (step.coder === BRUTE_FORCE) {
        for (const coder of CODERS) {
            resolveArguments(input, mode, step, coder);
        }
    } else {
        const coder = getCoder(step.coder);
        if (coder === undefined) {
            const error = Error(`Cannot find coder: ${step.coder}`);
            // FIXME errors
            return;
        }
        resolveArguments(input, mode, step, coder);
    }
}

function resolveArguments(input: CoderInput, mode: Mode, step: LinkedStep, coder: Coder): void {
    // Convert the arguments
    const convertedVars = coder.convertArgs(...step.args);
    if (convertedVars instanceof Error) {
        // FIXME errors
        return;
    }
    // Fill-in brute-force variables
    const possibleVars: optValue[][] = [];
    for (let i = 0; i < convertedVars.length; i++) {
        if (i < coder.varDefs.length && convertedVars[i] === undefined) {
            const bruteForceValues = coder.varDefs[i].bruteForceValues
            if (bruteForceValues === undefined) {
                const error = Error(`[${coder.varDefs[i].name} Missing variable without brute-force values`);
                // FIXME errors
                return;
            } else {
                possibleVars[i] = bruteForceValues;
            }
        } else {
            possibleVars[i] = [convertedVars[i]];
        }
    }

    // Solve all combinations of variables
    for (const resolvedVars of cartesian(possibleVars)) {
        resolveVars(input, mode, step, coder, resolvedVars);
    }
}

function resolveVars(input: CoderInput, mode: Mode, step: LinkedStep, coder: Coder, vars: optValue[]): void {
    const inputString = typeof input === "string" ? input : input.output;
    const checks = coder.checkVars(inputString, ...vars);
    if (checks instanceof Error) {
        // FIXME errors
        return;
    }
    let output: string;
    switch (mode) {
        case "encode":
            output = coder._encode(inputString, ...vars);
            break;
        case "decode":
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
        postMessage(result);
    } else {
        resolveCoder(result, mode, step.nextStep);
    }
}

