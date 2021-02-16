import {Component} from "../Component";
import {Step} from "./Step";
import {Setting} from "./Setting";
import {OptionDef} from "../../../lib/values/OptionDef";

export class Settings extends Component {
    readonly parent: Step;
    readonly headElement: HTMLTableSectionElement;
    readonly element: HTMLTableSectionElement

    settings: Setting[];

    constructor(parent: Step) {
        super();
        this.parent = parent;
        this.headElement = this.parent.getChild("settings-head") as HTMLTableSectionElement;
        this.element = this.parent.getChild("settings") as HTMLTableSectionElement;

        this.settings = [];
    }

    clear(): void {
        this.element.innerHTML = "";
        this.settings = [];
    }

    setOptionDefs(optionDefs: OptionDef[]): void {
        this.clear();
        const hasOptions = optionDefs.length > 0;
        this.headElement.hidden = !hasOptions;
        this.element.hidden = !hasOptions;
        for (const optionDef of optionDefs) {
            const setting = new Setting(this, optionDef);
            this.settings.push(setting);
            this.element.append(setting.element);
        }
    }

    setBruteForce(): void {
        this.clear();
        this.headElement.hidden = true;
        this.element.hidden = true;
    }
}
