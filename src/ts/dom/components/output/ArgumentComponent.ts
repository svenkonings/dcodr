import {Component} from "../Component";
import {ArgumentsComponent} from "./ArgumentsComponent";
import {getTemplate} from "../../util";
import {Coder} from "../../../lib/coders/Coder";

export class ArgumentComponent extends Component {
    readonly parent: ArgumentsComponent;
    readonly element: HTMLDivElement;

    readonly coderName: HTMLButtonElement;
    readonly coderValues: HTMLDivElement;
    readonly coderTable: HTMLTableElement;

    constructor(parent: ArgumentsComponent, number: number, coder: Coder, ...args: string[]) {
        super();
        this.parent = parent;
        this.element = getTemplate("argument") as HTMLDivElement;

        const className = "collapse" + number;
        this.coderName = this.getChild("coder-name") as HTMLButtonElement;
        this.coderName.setAttribute("data-bs-target", "." + className);
        this.coderValues = this.getChild("coder-values") as HTMLDivElement;
        this.coderValues.classList.add(className);
        this.coderTable = this.getChild("coder-table") as HTMLTableElement;

        this.coderName.innerText = coder.name;

        let i = 0;
        for (const varDef of coder.varDefs) {
            this.appendRow(varDef.name, args[i++]);
        }
        for (const optionDef of coder.optionDefs) {
            this.appendRow(optionDef.name, args[i++]);
        }
    }

    private appendRow(name: string, value: string): void {
        const row = this.coderTable.insertRow();
        const nameCell = row.insertCell();
        nameCell.innerText = name;
        const valueCell = row.insertCell();
        valueCell.innerText = value;
    }
}
