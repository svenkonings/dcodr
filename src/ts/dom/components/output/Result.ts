import {Component} from "../Component";
import {Results} from "./Results";
import {getTemplate} from "../../util";
import {Arguments} from "./Arguments";

export class Result extends Component {
    readonly parent: Results;
    readonly element: HTMLDivElement;

    readonly coders: Arguments;
    readonly output: HTMLParagraphElement;

    constructor(parent: Results) {
        super();
        this.parent = parent;
        this.element = getTemplate("result") as HTMLDivElement;

        this.coders = new Arguments(this);
        this.output = this.getChild("output") as HTMLParagraphElement;
    }
}
