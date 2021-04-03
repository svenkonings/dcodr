import {WorkerInput} from "../lib/worker/WorkerInput";
import {resolveSteps} from "./DepthFirstSearch";

const ctx: Worker = self as any; // eslint-disable-line
ctx.addEventListener("message", ev => {
    const message: WorkerInput = ev.data;
    resolveSteps(message);
});
