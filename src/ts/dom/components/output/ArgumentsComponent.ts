import {Component} from "../Component";
import {ResultComponent} from "./ResultComponent";
import {ArgumentComponent} from "./ArgumentComponent";

export class ArgumentsComponent extends Component {
    readonly parent: ResultComponent;
    readonly element: HTMLDivElement;

    value: ArgumentComponent[];

    constructor(parent: ResultComponent) {
        super();
        this.parent = parent;
        this.element = parent.getChild("coders") as HTMLDivElement;

        this.value = [];
    }
}
