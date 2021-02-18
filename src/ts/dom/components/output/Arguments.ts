import {Component} from "../Component";
import {Result} from "./Result";
import {Argument} from "./Argument";

export class Arguments extends Component {
    readonly parent: Result;
    readonly element: HTMLDivElement;

    value: Argument[];

    constructor(parent: Result) {
        super();
        this.parent = parent;
        this.element = parent.getChild("coders") as HTMLDivElement;

        this.value = [];
    }
}
