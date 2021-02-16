import {Steps} from "./Steps";
import {getTemplate} from "../../util";
import {Component} from "../Component";
import {Variables} from "./Variables";
import {Settings} from "./Settings";
import {coders, getCoder} from "../../../lib/coders/Coders";
import {Coder} from "../../../lib/coders/Coder";

const BRUTE_FORCE = "Brute-force";

export class Step extends Component {
    readonly parent: Steps;
    readonly element: HTMLDivElement

    readonly coderSelect: HTMLSelectElement;
    readonly removeStepButton: HTMLButtonElement;
    readonly variables: Variables
    readonly settings: Settings

    constructor(parent: Steps) {
        super();
        this.parent = parent;
        this.element = getTemplate("step") as HTMLDivElement;

        this.coderSelect = this.getChild("coder") as HTMLSelectElement;
        this.removeStepButton = this.getChild("remove-step") as HTMLButtonElement;
        this.variables = new Variables(this);
        this.settings = new Settings(this);

        this.initCoderSelect();
        this.removeStepButton.addEventListener("click", () => this.parent.removeStep(this));
    }

    initCoderSelect(): void {
        this.addCoder(BRUTE_FORCE);
        for (const coder of coders) {
            this.addCoder(coder);
        }
        this.coderSelect.addEventListener("change", event => {
            const target = event.target as HTMLOptionElement;
            this.selectCoder(target.value);
        });
        this.selectCoder(BRUTE_FORCE);
    }

    addCoder(name: string): void {
        const option = document.createElement("option");
        option.text = name;
        this.coderSelect.add(option);
    }

    selectCoder(name: string): void {
        const bruteForce = name === BRUTE_FORCE;
        if (bruteForce) {
            this.variables.setBruteForce();
            this.settings.setBruteForce();
        } else {
            const coder = getCoder(name) as Coder;
            this.variables.setVarDefs(coder.varDefs);
            this.settings.setOptionDefs(coder.optionDefs);
        }
    }

    hideRemoveStepButton(hidden: boolean): void {
        this.removeStepButton.hidden = hidden;
    }
}
