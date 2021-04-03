import {Component} from "../Component";
import {ArgumentsComponent} from "./ArgumentsComponent";
import {getTemplate} from "../../util";
import {Coder} from "../../../lib/coders/Coder";
import {CoderResult} from "../../../lib/worker/CoderResult";
import {getCoder} from "../../../lib/coders/Coders";
import {value} from "../../../lib/values/ValueType";

export class ArgumentComponent extends Component {
    readonly parent: ArgumentsComponent;
    readonly element: HTMLDivElement;

    readonly coderName: HTMLButtonElement;
    readonly coderValues: HTMLDivElement;
    readonly coderTable: HTMLTableElement;

    constructor(parent: ArgumentsComponent, parentNumber: number, number: number, result: CoderResult) {
        super();
        this.parent = parent;
        this.element = getTemplate("argument") as HTMLDivElement;

        const className = "collapse" + parentNumber + number;
        this.coderName = this.getChild("coder-name") as HTMLButtonElement;
        this.coderName.setAttribute("data-bs-target", "." + className);
        this.coderValues = this.getChild("coder-values") as HTMLDivElement;
        this.coderValues.classList.add(className);
        this.coderTable = this.getChild("coder-table") as HTMLTableElement;

        const coder = getCoder(result.coder) as Coder
        this.coderName.innerText = coder.name;

        this.appendRow("input", typeof result.input === "string" ? result.input : result.input.output, true);

        let i = 0;
        for (const varDef of coder.varDefs) {
            this.appendRow(varDef.name, result.vars[i++]);
        }
        for (const optionDef of coder.optionDefs) {
            if (i < result.vars.length) {
                this.appendRow(optionDef.name, result.vars[i++]);
            } else {
                this.appendRow(optionDef.name, optionDef.defaultValue);
            }
        }

        this.appendRow("output", result.output, true);
    }

    appendRow(name: string, value: value, bold = false): void {
        const row = this.coderTable.insertRow();
        const nameCell = row.insertCell();
        nameCell.innerText = name;
        if (bold) {
            nameCell.classList.add("fw-bold");
        }
        const valueCell = row.insertCell();
        valueCell.innerText = value.toString();
    }
}
