import {Component} from "../Component";
import {StepComponent} from "./StepComponent";
import {SettingComponent} from "./SettingComponent";
import {OptionDef} from "../../../lib/values/OptionDef";

export class SettingsComponent extends Component {
    readonly parent: StepComponent;
    readonly headElement: HTMLTableSectionElement;
    readonly element: HTMLTableSectionElement

    settings: SettingComponent[];

    constructor(parent: StepComponent) {
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
            const setting = new SettingComponent(this, optionDef);
            this.settings.push(setting);
            this.element.append(setting.element);
        }
    }

    setBruteForce(): void {
        this.clear();
        this.headElement.hidden = true;
        this.element.hidden = true;
    }

    getOptions(): string[] {
        return this.settings.map(setting => setting.getOption());
    }
}
