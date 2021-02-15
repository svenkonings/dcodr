import {Steps} from "./Steps";
import {Component} from "./Component";

export class InputContainer extends Component {
    readonly element: HTMLDivElement;

    readonly input: HTMLInputElement;
    readonly steps: Steps;
    readonly encodeButton: HTMLButtonElement;
    readonly decodeButton: HTMLButtonElement;

    constructor() {
        super();
        this.element = document.getElementById("input-container") as HTMLDivElement;
        this.input = document.getElementById("input") as HTMLInputElement;
        this.steps = new Steps(this);
        this.encodeButton = document.getElementById("encode") as HTMLButtonElement;
        this.decodeButton = document.getElementById("decode") as HTMLButtonElement;
    }

    getInput(): string {
        return this.input.value;
    }
}
