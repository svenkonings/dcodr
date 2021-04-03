import {Component} from "../Component";
import {getTemplate} from "../../util";
import {SettingsComponent} from "./SettingsComponent";
import {OptionDef} from "../../../lib/values/OptionDef";

export class SettingComponent extends Component {
    readonly parent: SettingsComponent;
    readonly element: HTMLTableRowElement;

    readonly name: HTMLTableCellElement;
    readonly input: HTMLInputElement;

    constructor(parent: SettingsComponent, optionDef: OptionDef) {
        super();
        this.parent = parent;
        this.element = getTemplate("valueRow") as HTMLTableRowElement;

        this.name = this.getChild("value-name") as HTMLTableCellElement;
        this.input = this.getChild("value-input") as HTMLInputElement;

        this.name.innerText = optionDef.name;
        this.input.value = optionDef.defaultValue.toString();
    }

    getOption(): string {
        return this.input.value;
    }
}
