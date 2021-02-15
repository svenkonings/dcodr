import {Component} from "./Component";
import {Variables} from "./Variables";
import {getTemplate} from "../util";

const PREFIX = "Variable ";

export class BruteForceVariable extends Component {
    readonly parent: Variables;
    readonly element: HTMLTableRowElement;

    readonly name: HTMLTableCellElement;
    number: number;
    readonly bruteForce: HTMLInputElement;
    readonly input: HTMLInputElement;
    readonly removeButton: HTMLButtonElement;

    constructor(parent: Variables, number: number) {
        super();
        this.parent = parent;
        this.element = getTemplate("bruteForceRow") as HTMLTableRowElement;

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

    getNumber(): number {
        return this.number;
    }

    isBruteForce(): boolean {
        return this.bruteForce.checked;
    }

    getVariable(): string {
        return this.input.value;
    }
}
