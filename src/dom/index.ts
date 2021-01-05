import {WorkerMessage} from "../lib/worker/WorkerMessage";

const worker = new Worker("worker.js");
worker.onmessage = ev => document.getElementsByTagName("body")[0].innerHTML += ev.data + "<br/>"

const message: WorkerMessage = {
    coder: "Caesar Cipher",
    mode: "encode",
    input: "Hello world!",
    args: ["1"]
}
worker.postMessage(message)
