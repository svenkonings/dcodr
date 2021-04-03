import {StepsComponent} from "./StepsComponent";
import {Component} from "../Component";
import {WorkerInput} from "../../../lib/worker/WorkerInput";
import {Mode} from "../../../lib/worker/Mode";

export class InputComponent extends Component {
    readonly element: HTMLDivElement;
    readonly worker: Worker;

    readonly input: HTMLInputElement;
    readonly steps: StepsComponent;
    readonly encodeButton: HTMLButtonElement;
    readonly decodeButton: HTMLButtonElement;

    constructor(worker: Worker) {
        super();
        this.worker = worker;
        this.element = document.getElementById("input-container") as HTMLDivElement;
        this.input = document.getElementById("input") as HTMLInputElement;
        this.steps = new StepsComponent(this);
        // FIXME Change buttons into stop button after press
        this.encodeButton = document.getElementById("encode") as HTMLButtonElement;
        this.encodeButton.addEventListener("click", () => {
            const message: WorkerInput = {
                input: this.getInput(),
                mode: Mode.Encode,
                steps: []//this.steps.getSteps() // FIXME implement method
            }
            worker.postMessage(message);
        })
        this.decodeButton = document.getElementById("decode") as HTMLButtonElement;
    }

    getInput(): string {
        return this.input.value;
    }
}
