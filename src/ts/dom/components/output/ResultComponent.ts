import {Component} from "../Component";
import {ResultsComponent} from "./ResultsComponent";
import {getTemplate} from "../../util";
import {ArgumentsComponent} from "./ArgumentsComponent";

export class ResultComponent extends Component {
    readonly parent: ResultsComponent;
    readonly element: HTMLDivElement;

    readonly coders: ArgumentsComponent;
    readonly output: HTMLParagraphElement;

    constructor(parent: ResultsComponent) {
        super();
        this.parent = parent;
        this.element = getTemplate("result") as HTMLDivElement;

        this.coders = new ArgumentsComponent(this);
        this.output = this.getChild("output") as HTMLParagraphElement;
    }
}
