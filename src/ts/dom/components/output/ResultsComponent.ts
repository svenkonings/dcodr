import {Component} from "../Component";
import {OutputComponent} from "./OutputComponent";
import {ResultComponent} from "./ResultComponent";
import {CoderOutput} from "../../../lib/worker/CoderResult";
import {WorkerStatus} from "../../../lib/worker/WorkerStatus";
import {ErrorComponent} from "./ErrorComponent";

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

    // TODO: Add pagination
    addResult(result: CoderOutput): void {
        const component = new ResultComponent(this, this.value.length, result);
        for (let i = 0; i < this.value.length; i++) {
            const otherComponent = this.value[i];
            // Sort smallest scores first (least distance from english bigram frequency)
            if (result.score < otherComponent.result.score) {
                this.value.splice(i, 0, component);
                this.element.insertBefore(component.element, otherComponent.element);
                return;
            }
        }
        // Highest score, add to end
        this.value.push(component);
        this.element.append(component.element);
    }

    addError(error: Error): void {
        const component = new ErrorComponent(this, error);
        this.element.append(component.element);
    }

    processWorkerStatus(status: WorkerStatus): void {
        switch (status) {
            case WorkerStatus.Done:
                if (this.element.childElementCount === 0) {
                    this.addError(Error("Brute-force yielded no results"));
                }
        }
    }
}
