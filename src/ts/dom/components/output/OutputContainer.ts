import {Component} from "../Component";
import {Results} from "./Results";


export class OutputContainer extends Component {
    readonly element: HTMLDivElement;

    readonly results: Results;

    constructor() {
        super();
        this.element = document.getElementById("input-container") as HTMLDivElement;
        this.results = new Results(this);
    }
}
