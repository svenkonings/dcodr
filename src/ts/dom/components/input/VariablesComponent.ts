import {Component} from "../Component";
import {StepComponent} from "./StepComponent";
import {VariableComponent} from "./VariableComponent";
import {BruteForceVariableComponent} from "./BruteForceVariableComponent";
import {VarDef} from "../../../lib/values/VarDef";
import {optString} from "../../../lib/util/types";

// TODO: Preview bruteforcevalues of arg (when selecting coder)
export class VariablesComponent extends Component {
    readonly parent: StepComponent;
    readonly headElement: HTMLTableSectionElement;
    readonly element: HTMLTableSectionElement

    bruteForce: boolean;
    variables: VariableComponent[];
    bruteForceVariables: BruteForceVariableComponent[];
    readonly addVariableButton: HTMLButtonElement;

    constructor(parent: StepComponent) {
        super();
        this.parent = parent;
        this.headElement = this.parent.getChild("variables-head") as HTMLTableSectionElement;
        this.element = this.parent.getChild("variables") as HTMLTableSectionElement;

        this.bruteForce = true;
        this.variables = [];
        this.bruteForceVariables = [];
        this.addVariableButton = this.parent.getChild("add-variable") as HTMLButtonElement;

        this.addVariableButton.addEventListener("click", () => this.addBruteForceVariable());
    }

    clear(): void {
        this.element.innerHTML = "";
        this.variables = [];
        this.bruteForceVariables = [];
    }

    setVarDefs(varDefs: VarDef[]): void {
        this.clear();
        this.bruteForce = false;
        const hasVars = varDefs.length > 0;
        this.headElement.hidden = !hasVars;
        this.element.hidden = !hasVars;
        this.addVariableButton.hidden = true;
        for (const varDef of varDefs) {
            const variable = new VariableComponent(this, varDef);
            this.variables.push(variable);
            this.element.append(variable.element);
        }
    }

    setBruteForce(): void {
        this.clear();
        this.bruteForce = true;
        this.headElement.hidden = false;
        this.element.hidden = false;
        this.addVariableButton.hidden = false;
    }

    addBruteForceVariable(): void {
        const variable = new BruteForceVariableComponent(this, this.bruteForceVariables.length + 1);
        this.bruteForceVariables.push(variable);
        this.element.append(variable.element);
    }

    removeBruteForceVariable(variable: BruteForceVariableComponent): void {
        const index = this.bruteForceVariables.indexOf(variable);
        variable.element.remove();
        this.bruteForceVariables = this.bruteForceVariables.filter(item => item !== variable);
        for (let i = index; i < this.bruteForceVariables.length; i++) {
            this.bruteForceVariables[i].setNumber(i + 1);
        }
    }

    getVariables(): optString[] {
        const variables = this.bruteForce ? this.bruteForceVariables : this.variables;
        return variables.map((variable: VariableComponent | BruteForceVariableComponent) => variable.getVariable());
    }
}
