import {Step} from "./Step";
import {InputContainer} from "./InputContainer";
import {Component} from "../Component";

export class Steps extends Component {
    readonly parent: InputContainer;
    readonly element: HTMLDivElement;

    value: Step[];
    readonly addStepButton: HTMLButtonElement

    constructor(parent: InputContainer) {
        super();
        this.parent = parent;
        this.element = document.getElementById("steps") as HTMLDivElement;
        this.value = [];
        this.addStepButton = document.getElementById("add-step") as HTMLButtonElement;
        this.addStep(); // Add first step
        this.addStepButton.addEventListener("click", () => this.addStep());
    }

    addStep(): void {
        const step = new Step(this);
        this.value.push(step);
        this.element.insertBefore(step.element, this.addStepButton);
        this.toggleRemoveButtons();
    }

    removeStep(step: Step): void {
        step.element.remove();
        this.value = this.value.filter(item => item !== step);
        this.toggleRemoveButtons();
    }

    toggleRemoveButtons(): void {
        this.value.forEach(step => step.hideRemoveStepButton(this.value.length <= 1));
    }
}
