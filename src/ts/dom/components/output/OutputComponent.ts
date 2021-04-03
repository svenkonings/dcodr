import {Component} from "../Component";
import {ResultsComponent} from "./ResultsComponent";
import {Index} from "../../index";
import {CoderOutput} from "../../../lib/worker/CoderResult";
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
        this.results.clear();
    }

    addResult(result: CoderOutput): void {
        this.results.addResult(result);
    }

    addError(error: Error): void {
        this.results.addError(error);
    }

    processWorkerStatus(status: WorkerStatus): void {
        this.results.processWorkerStatus(status);
    }
}
