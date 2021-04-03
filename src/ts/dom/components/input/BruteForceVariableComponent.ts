import {Component} from "../Component";
import {VariablesComponent} from "./VariablesComponent";
import {getTemplate} from "../../util";
import {optString} from "../../../lib/util/types";

const PREFIX = "Variable ";

export class BruteForceVariableComponent extends Component {
    readonly parent: VariablesComponent;
    readonly element: HTMLTableRowElement;

    readonly name: HTMLTableCellElement;
    number: number;
    readonly bruteForce: HTMLInputElement;
    readonly input: HTMLInputElement;
    readonly removeButton: HTMLButtonElement;

    constructor(parent: VariablesComponent, number: number) {
        super();
        this.parent = parent;
        this.element = getTemplate("bruteForceVariableRow") as HTMLTableRowElement;

        this.number = number;
        this.name = this.getChild("value-name") as HTMLTableCellElement;
        this.name.innerText = PREFIX + this.number;
        this.bruteForce = this.getChild("value-brute-force") as HTMLInputElement;
        this.input = this.getChild("value-input") as HTMLInputElement;
        this.removeButton = this.getChild("value-remove") as HTMLButtonElement;

        this.removeButton.addEventListener("click", () => this.parent.removeBruteForceVariable(this));
    }

    getName(): string {
        return this.name.innerText;
    }

    setNumber(number: number): void {
        this.number = number;
        this.name.innerText = PREFIX + this.number;
    }

    isBruteForce(): boolean {
        return this.bruteForce.checked;
    }

    getVariable(): optString {
        return this.isBruteForce() ? undefined : this.input.value;
    }
}
