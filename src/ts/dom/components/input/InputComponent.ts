import {StepsComponent} from "./StepsComponent";
import {Component} from "../Component";
import {WorkerInput} from "../../../lib/worker/WorkerInput";
import {Mode} from "../../../lib/worker/Mode";
import {Step} from "../../../lib/worker/Step";
import {Index} from "../../index";
import {WorkerStatus} from "../../../lib/worker/WorkerStatus";

export class InputComponent extends Component {
    readonly parent: Index
    readonly element: HTMLDivElement;
    worker: Worker;

    readonly input: HTMLInputElement;
    readonly steps: StepsComponent;
    readonly controlButtons: HTMLDivElement;
    readonly encodeButton: HTMLButtonElement;
    readonly decodeButton: HTMLButtonElement;
    readonly stopButton: HTMLButtonElement;

    constructor(parent: Index, worker: Worker) {
        super();
        this.parent = parent;
        this.worker = worker;
        this.element = document.getElementById("input-container") as HTMLDivElement;
        this.input = document.getElementById("input") as HTMLInputElement;
        this.steps = new StepsComponent(this);

        this.controlButtons = document.getElementById("control-buttons") as HTMLDivElement;
        this.encodeButton = document.getElementById("encode") as HTMLButtonElement;
        this.addListener(this.encodeButton, Mode.Encode);
        this.decodeButton = document.getElementById("decode") as HTMLButtonElement;
        this.addListener(this.decodeButton, Mode.Decode);
        this.stopButton = document.getElementById("stop") as HTMLButtonElement;
        this.stopButton.addEventListener("click", () => this.parent.resetWorker());
        this.setRunning(false);
    }

    addListener(button: HTMLButtonElement, mode: Mode): void {
        button.addEventListener("click", () => {
            this.parent.clear();
            const message: WorkerInput = {
                input: this.getInput(),
                mode: mode,
                steps: this.getSteps()
            }
            this.worker.postMessage(message);
            this.setRunning(true);
        });
    }

    setWorker(worker: Worker): void {
        this.worker = worker;
        this.setRunning(false);
    }

    setRunning(running: boolean): void {
        this.controlButtons.hidden = running;
        this.stopButton.hidden = !running;
    }

    getInput(): string {
        return this.input.value;
    }

    getSteps(): Step[] {
        return this.steps.getSteps();
    }

    processWorkerStatus(status: WorkerStatus): void {
        switch (status) {
            case WorkerStatus.Done:
                this.setRunning(false);
        }
    }
}
