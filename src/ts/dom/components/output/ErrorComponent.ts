import {Component} from "../Component";
import {ResultsComponent} from "./ResultsComponent";
import {getTemplate} from "../../util";

export class ErrorComponent extends Component {
    readonly parent: ResultsComponent;
    readonly element: HTMLDivElement;

    readonly error: Error;

    readonly output: HTMLParagraphElement;

    constructor(parent: ResultsComponent, error: Error) {
        super();
        this.parent = parent;
        this.element = getTemplate("error") as HTMLDivElement;

        this.error = error;

        this.output = this.getChild("output") as HTMLParagraphElement;
        this.output.innerText = this.error.message;
    }
}
