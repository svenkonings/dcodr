import {Component} from "./Component";
import {Step} from "./Step";
import {Variable} from "./Variable";
import {BruteForceVariable} from "./BruteForceVariable";
import {VarDef} from "../../lib/values/VarDef";

export class Variables extends Component {
    readonly parent: Step;
    readonly headElement: HTMLTableSectionElement;
    readonly element: HTMLTableSectionElement

    bruteForce: boolean;
    variables: Variable[];
    bruteForceVariables: BruteForceVariable[];
    readonly addVariableButton: HTMLButtonElement;

    constructor(parent: Step) {
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
            const variable = new Variable(this, varDef);
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
        const variable = new BruteForceVariable(this, this.bruteForceVariables.length + 1);
        this.bruteForceVariables.push(variable);
        this.element.append(variable.element);
    }

    removeBruteForceVariable(variable: BruteForceVariable): void {
        const index = this.bruteForceVariables.indexOf(variable);
        variable.element.remove();
        this.bruteForceVariables = this.bruteForceVariables.filter(item => item !== variable);
        for (let i = index; i < this.bruteForceVariables.length; i++) {
            this.bruteForceVariables[i].setNumber(i + 1);
        }
    }
}
