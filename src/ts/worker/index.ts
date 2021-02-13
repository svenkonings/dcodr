import {WorkerMessage} from "../lib/worker/WorkerMessage";
import {WorkerResponse} from "../lib/worker/WorkerResponse";
import {getCoder} from "../lib/coders/Coders";
import {optValue} from "../lib/values/ValueType";
import {cartesian} from "../lib/util/functions";

const ctx: Worker = self as any; // eslint-disable-line
ctx.onmessage = ev => {
    const message: WorkerMessage = ev.data;
    // Get the specified coder
    const coder = getCoder(message.coder);
    if (coder === undefined) {
        const error = Error(`Cannot find coder: ${message.coder}`);
        postOutput(message, error);
        return;
    }
    // Convert the arguments
    const convertedVars = coder.convertArgs(...message.args);
    if (convertedVars instanceof Error) {
        postOutput(message, convertedVars);
        return;
    }
    // Fill-in brute-force variables
    const possibleVars: optValue[][] = [];
    for (let i = 0; i < convertedVars.length; i++) {
        if (i < coder.varDefs.length && convertedVars[i] === undefined) {
            const bruteForceValues = coder.varDefs[i].bruteForceValues
            if (bruteForceValues === undefined) {
                const error = Error(`[${coder.varDefs[i].name} Missing variable without brute-force values`);
                postOutput(message, error);
                return;
            } else {
                possibleVars[i] = bruteForceValues;
            }
        } else {
            possibleVars[i] = [convertedVars[i]];
        }
    }
    // Solve all combinations of variables
    const allVars: optValue[][] = cartesian(possibleVars);
    for (const vars of allVars) {
        const checks = coder.checkVars(message.input, ...vars);
        if (checks instanceof Error) {
            postOutput(message, checks, undefined, vars);
            return;
        }
        let output;
        switch (message.mode) {
            case "encode":
                output = coder._encode(message.input, ...vars);
                break;
            case "decode":
                output = coder._decode(message.input, ...vars);
                break;
        }
        postOutput(message, undefined, output, vars);
    }
}

function postOutput(message: WorkerMessage, error?: Error, output?: string, vars?: optValue[]) {
    const result: WorkerResponse = {
        coder: message.coder,
        mode: message.mode,
        input: message.input,
        args: message.args,
        vars: vars,
        output: output,
        error: error
    }
    postMessage(result);
}
