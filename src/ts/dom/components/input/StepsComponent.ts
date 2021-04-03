import {StepComponent} from "./StepComponent";
import {InputComponent} from "./InputComponent";
import {Component} from "../Component";
import {Step} from "../../../lib/worker/Step";

export class StepsComponent extends Component {
    readonly parent: InputComponent;
    readonly element: HTMLDivElement;

    value: StepComponent[];
    readonly addStepButton: HTMLButtonElement

    constructor(parent: InputComponent) {
        super();
        this.parent = parent;
        this.element = document.getElementById("steps") as HTMLDivElement;
        this.value = [];
        this.addStepButton = document.getElementById("add-step") as HTMLButtonElement;
        this.addStep(); // Add first step
        this.addStepButton.addEventListener("click", () => this.addStep());
    }

    addStep(): void {
        const step = new StepComponent(this);
        this.value.push(step);
        this.element.insertBefore(step.element, this.addStepButton);
        this.toggleRemoveButtons();
    }

    removeStep(step: StepComponent): void {
        step.element.remove();
        this.value = this.value.filter(item => item !== step);
        this.toggleRemoveButtons();
    }

    toggleRemoveButtons(): void {
        this.value.forEach(step => step.hideRemoveStepButton(this.value.length <= 1));
    }

    getSteps(): Step[] {
        return this.value.map(step => step.getStep());
    }
}
