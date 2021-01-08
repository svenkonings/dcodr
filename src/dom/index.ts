import {WorkerMessage} from "../lib/worker/WorkerMessage";
import {WorkerResponse} from "../lib/worker/WorkerResponse";

const worker = new Worker("worker.js");
worker.onmessage = function (ev) {
    const response: WorkerResponse = ev.data;
    document.getElementsByTagName("body")[0].innerHTML += (response.output ? response.output : response.error?.message) + "<br/>"
}

const message: WorkerMessage = {
    coder: "Caesar Cipher",
    mode: "encode",
    input: "Hello world!",
    args: [undefined]
}
worker.postMessage(message)
