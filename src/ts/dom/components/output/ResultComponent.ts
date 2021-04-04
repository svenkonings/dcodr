import {LazyComponent} from "../LazyComponent";
import {ResultsComponent} from "./ResultsComponent";
import {getTemplate} from "../../util";
import {ArgumentsComponent} from "./ArgumentsComponent";
import {CoderOutput} from "../../../lib/worker/CoderResult";

export class ResultComponent extends LazyComponent {
    readonly parent: ResultsComponent;
    protected element: HTMLDivElement | undefined;

    readonly id: number
    readonly result: CoderOutput;

    protected coders: ArgumentsComponent | undefined;
    protected output: HTMLParagraphElement | undefined;

    constructor(parent: ResultsComponent, id: number, result: CoderOutput) {
        super();
        this.parent = parent;
        this.id = id;
        this.result = result;
    }

    getElement(): HTMLDivElement {
        if (this.element === undefined) {
            this.element = getTemplate("result") as HTMLDivElement;
            this.coders = new ArgumentsComponent(this, this.id, this.result);
            this.output = this.getChild("output") as HTMLParagraphElement;
            this.output.innerText = this.result.output;
        }
        return this.element;
    }
}
