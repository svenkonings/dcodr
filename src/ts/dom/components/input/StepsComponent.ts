import {StepComponent} from "./StepComponent";
import {InputComponent} from "./InputComponent";
import {Component} from "../Component";
import {Step} from "../../../lib/worker/Step";

// TODO: Add presets
export class StepsComponent extends Component {
    readonly parent: InputComponent;
    readonly element: HTMLDivElement;

    steps: StepComponent[];
    readonly addStepButton: HTMLButtonElement

    constructor(parent: InputComponent) {
        super();
        this.parent = parent;
        this.element = document.getElementById("steps") as HTMLDivElement;
        this.steps = [];
        this.addStepButton = document.getElementById("add-step") as HTMLButtonElement;
        this.addStep(); // Add first step
        this.addStepButton.addEventListener("click", () => this.addStep());
    }

    addStep(): void {
        const step = new StepComponent(this);
        this.steps.push(step);
        this.element.insertBefore(step.element, this.addStepButton);
        this.toggleRemoveButtons();
    }

    removeStep(step: StepComponent): void {
        step.element.remove();
        this.steps = this.steps.filter(item => item !== step);
        this.toggleRemoveButtons();
    }

    toggleRemoveButtons(): void {
        this.steps.forEach(step => step.hideRemoveStepButton(this.steps.length <= 1));
    }

    getSteps(): Step[] {
        return this.steps.map(step => step.getStep());
    }
}
