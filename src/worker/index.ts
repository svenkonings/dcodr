import {WorkerMessage} from "../lib/worker/WorkerMessage";
import {getCoder} from "../lib/coders/Coders";

const ctx: Worker = self as any;
ctx.onmessage = ev => {
    const message: WorkerMessage = ev.data;
    const coder = getCoder(message.coder);
    if (coder === undefined || !coder.applicable(message.input, ...message.args)) {
        return;
    }
    let result;
    switch (message.mode) {
        case "encode":
            result = coder.encode(message.input, ...message.args);
            break;
        case "decode":
            result = coder.decode(message.input, ...message.args);
            break;
    }
    postMessage(result);
}
