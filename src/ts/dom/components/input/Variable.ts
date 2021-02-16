import {Component} from "../Component";
import {Variables} from "./Variables";
import {getTemplate} from "../../util";
import {VarDef} from "../../../lib/values/VarDef";

export class Variable extends Component {
    readonly parent: Variables;
    readonly element: HTMLTableRowElement;

    readonly name: HTMLTableCellElement;
    readonly input: HTMLInputElement;

    constructor(parent: Variables, varDef: VarDef) {
        super();
        this.parent = parent;
        this.element = getTemplate("valueRow") as HTMLTableRowElement;

        this.name = this.getChild("value-name") as HTMLTableCellElement;
        this.input = this.getChild("value-input") as HTMLInputElement;

        this.name.innerText = varDef.name;
        this.input.placeholder = varDef.type;
    }

    getVariable(): string {
        return this.input.value;
    }
}
