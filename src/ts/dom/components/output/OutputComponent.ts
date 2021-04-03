import {Component} from "../Component";
import {ResultsComponent} from "./ResultsComponent";
import {WorkerOutput} from "../../../lib/worker/WorkerOutput";


export class OutputComponent extends Component {
    readonly element: HTMLDivElement;
    readonly worker: Worker;

    readonly results: ResultsComponent;

    constructor(worker: Worker) {
        super();
        this.element = document.getElementById("input-container") as HTMLDivElement;
        this.worker = worker;
        this.results = new ResultsComponent(this);
        this.worker.addEventListener("message", ev => {
            const result = ev.data as WorkerOutput;
            console.log(result) // FIXME Add results to UI
        })
    }
}
