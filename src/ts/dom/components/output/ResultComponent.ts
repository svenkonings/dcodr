import {Component} from "../Component";
import {ResultsComponent} from "./ResultsComponent";
import {getTemplate} from "../../util";
import {ArgumentsComponent} from "./ArgumentsComponent";
import {CoderOutput} from "../../../lib/worker/CoderResult";

export class ResultComponent extends Component {
    readonly parent: ResultsComponent;
    readonly element: HTMLDivElement;

    readonly result: CoderOutput;

    readonly coders: ArgumentsComponent;
    readonly output: HTMLParagraphElement;

    constructor(parent: ResultsComponent, number: number, result: CoderOutput) {
        super();
        this.parent = parent;
        this.element = getTemplate("result") as HTMLDivElement;

        this.result = result;

        this.coders = new ArgumentsComponent(this, number, result);
        this.output = this.getChild("output") as HTMLParagraphElement;
        this.output.innerText = result.output;
    }
}
