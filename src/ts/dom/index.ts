import 'bootstrap';
import '../../scss/main.scss';
import {InputComponent} from "./components/input/InputComponent";
import {OutputComponent} from "./components/output/OutputComponent";
import {WorkerOutput} from "../lib/worker/WorkerOutput";

export class Index {
    worker: Worker;
    readonly inputComponent: InputComponent;
    readonly outputComponent: OutputComponent;

    constructor() {
        this.worker = new Worker("worker.js");
        this.addListener();
        this.inputComponent = new InputComponent(this, this.worker);
        this.outputComponent = new OutputComponent(this, this.worker);
    }

    clear(): void {
        this.outputComponent.clear();
    }

    resetWorker(): void {
        this.worker.terminate();
        this.worker = new Worker("worker.js");
        this.addListener();
        this.inputComponent.setWorker(this.worker);
        this.outputComponent.setWorker(this.worker);
    }

    addListener(): void {
        this.worker.addEventListener("message", ev => {
            const result = ev.data as WorkerOutput;
            if (result instanceof Error) {
                // Error
                this.outputComponent.addError(result);
            } else if (typeof result === "string") {
                // WorkerStatus
                this.inputComponent.processWorkerStatus(result);
                this.outputComponent.processWorkerStatus(result);
            } else {
                // CoderOutput
               this.outputComponent.addResult(result);
            }
        })
    }
}

new Index();
