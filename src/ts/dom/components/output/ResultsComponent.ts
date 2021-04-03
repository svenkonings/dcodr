import {Component} from "../Component";
import {OutputComponent} from "./OutputComponent";
import {ResultComponent} from "./ResultComponent";

export class ResultsComponent extends Component {
    readonly parent: OutputComponent;
    readonly element: HTMLDivElement;

    value: ResultComponent[];

    constructor(parent: OutputComponent) {
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
