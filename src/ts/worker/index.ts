import {WorkerMessage} from "../lib/worker/WorkerMessage";
import {resolveCoder} from "./DepthFirstSearch";
import {linkedStep} from "../lib/worker/Step";

const ctx: Worker = self as any; // eslint-disable-line
ctx.onmessage = ev => {
    const message: WorkerMessage = ev.data;
    resolveCoder(message.input, message.mode, linkedStep(...message.steps));
}
