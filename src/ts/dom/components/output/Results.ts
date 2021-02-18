import {Component} from "../Component";
import {OutputContainer} from "./OutputContainer";
import {Result} from "./Result";

export class Results extends Component {
    readonly parent: OutputContainer;
    readonly element: HTMLDivElement;

    value: Result[];

    constructor(parent: OutputContainer) {
        super();
        this.parent = parent;
        this.element = document.getElementById("results") as HTMLDivElement;

        this.value = [];
    }

    clear(): void {
        this.element.innerHTML = "";
        this.value = [];
    }
}
