import {Component} from "../Component";
import {ResultsComponent} from "./ResultsComponent";
import {Index} from "../../index";
import {CoderResult} from "../../../lib/worker/CoderResult";
import {WorkerStatus} from "../../../lib/worker/WorkerStatus";


export class OutputComponent extends Component {
    readonly parent: Index;
    readonly element: HTMLDivElement;
    worker: Worker;

    readonly results: ResultsComponent;

    constructor(parent: Index, worker: Worker) {
        super();
        this.parent = parent;
        this.element = document.getElementById("input-container") as HTMLDivElement;
        this.worker = worker;
        this.results = new ResultsComponent(this);
    }

    setWorker(worker: Worker): void {
        this.worker = worker;
    }

    clear(): void {

    }

    addResult(result: CoderResult): void {

    }

    addError(error: Error): void {

    }

    processWorkerStatus(status: WorkerStatus): void {

    }
}
