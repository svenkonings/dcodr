import {Component} from "../Component";
import {VariablesComponent} from "./VariablesComponent";
import {getTemplate} from "../../util";
import {VarDef} from "../../../lib/values/VarDef";
import {optString} from "../../../lib/util/types";

export class VariableComponent extends Component {
    readonly parent: VariablesComponent;
    readonly element: HTMLTableRowElement;

    readonly name: HTMLTableCellElement;
    readonly bruteForceContainer: HTMLDivElement;
    readonly bruteForce: HTMLInputElement;
    readonly input: HTMLInputElement;

    constructor(parent: VariablesComponent, varDef: VarDef) {
        super();
        this.parent = parent;
        this.element = getTemplate("variableRow") as HTMLTableRowElement;

        this.name = this.getChild("value-name") as HTMLTableCellElement;
        this.bruteForceContainer = this.getChild("value-brute-force-container") as HTMLDivElement;
        this.bruteForce = this.getChild("value-brute-force") as HTMLInputElement;
        this.input = this.getChild("value-input") as HTMLInputElement;

        this.name.innerText = varDef.name;
        this.input.placeholder = varDef.type;
        if (varDef.bruteForceValues.length === 0) {
            this.bruteForceContainer.style.visibility = "hidden";
        }
    }

    isBruteForce(): boolean {
        return this.bruteForce.checked;
    }

    getVariable(): optString {
        return this.isBruteForce() ? undefined : this.input.value;
    }
}
