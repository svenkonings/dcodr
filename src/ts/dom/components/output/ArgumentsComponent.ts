import {Component} from "../Component";
import {ResultComponent} from "./ResultComponent";
import {ArgumentComponent} from "./ArgumentComponent";
import {CoderResult} from "../../../lib/worker/CoderResult";

export class ArgumentsComponent extends Component {
    readonly parent: ResultComponent;
    readonly element: HTMLDivElement;

    value: ArgumentComponent[];

    constructor(parent: ResultComponent, number: number, result: CoderResult) {
        super();
        this.parent = parent;
        this.element = parent.getChild("arguments") as HTMLDivElement;

        this.value = [];
        this.addArgument(number, result);
    }

    addArgument(number: number, result: CoderResult): void {
        const argument = new ArgumentComponent(this, number, this.value.length, result)
        this.value.push(argument);
        this.element.insertBefore(argument.element, this.element.firstElementChild);
        if (typeof result.input !== "string") {
            this.addArgument(number, result.input);
        }
    }
}
