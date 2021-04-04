import {Component} from "../Component";
import {OutputComponent} from "./OutputComponent";
import {ResultComponent} from "./ResultComponent";
import {CoderOutput} from "../../../lib/worker/CoderResult";
import {WorkerStatus} from "../../../lib/worker/WorkerStatus";
import {ErrorComponent} from "./ErrorComponent";

const itemsPerPage = 10;

export class ResultsComponent extends Component {
    readonly parent: OutputComponent;
    readonly element: HTMLDivElement;

    readonly paginationFirst: HTMLButtonElement;
    readonly paginationPrevious: HTMLButtonElement;
    readonly paginationPage: HTMLInputElement;
    readonly paginationPages: HTMLSpanElement;
    readonly paginationNext: HTMLButtonElement;
    readonly paginationLast: HTMLButtonElement;

    results: CoderOutput[];
    resultComponents: ResultComponent[];
    page: number;
    start: number;
    end: number;
    pages: number

    constructor(parent: OutputComponent) {
        super();
        this.parent = parent;
        this.element = document.getElementById("results") as HTMLDivElement;

        this.paginationFirst = document.getElementById("first") as HTMLButtonElement;
        this.paginationPrevious = document.getElementById("previous") as HTMLButtonElement;
        this.paginationPage = document.getElementById("page") as HTMLInputElement;
        this.paginationPages = document.getElementById("pages") as HTMLButtonElement;
        this.paginationNext = document.getElementById("next") as HTMLButtonElement;
        this.paginationLast = document.getElementById("last") as HTMLButtonElement;

        this.results = [];
        this.resultComponents = [];
        this.page = 1;
        this.start = 0;
        this.end = itemsPerPage;
        this.pages = 1;

        this.paginationFirst.addEventListener("click", () => this.setPage(1));
        this.paginationPrevious.addEventListener("click", () => this.setPage(this.page - 1));
        this.paginationPage.addEventListener("change", () => this.setPageString(this.paginationPage.value));
        this.paginationNext.addEventListener("click", () => this.setPage(this.page + 1));
        this.paginationLast.addEventListener("click", () => this.setPage(this.pages));
    }

    clear(): void {
        this.results = [];
        this.resultComponents = [];
        this.setPage(1);
        this.setPages(1);
    }

    setPageString(pageString: string): void {
        if (/^\d+$/.test(pageString)) {
            const page = +pageString;
            if (page < 1) {
                this.setPage(1);
            } else if (page > this.pages) {
                this.setPage(this.pages);
            } else {
                this.setPage(page);
            }
        } else {
            this.setPage(1);
        }
    }

    setPage(page: number): void {
        this.page = page;
        this.start = (this.page - 1) * itemsPerPage;
        this.end = this.start + itemsPerPage;

        this.paginationPage.value = this.page.toString(10);
        this.paginationFirst.disabled = this.page <= 2;
        this.paginationPrevious.disabled = this.page <= 1;
        this.paginationNext.disabled = this.page >= this.pages;
        this.paginationLast.disabled = this.page >= this.pages - 1;

        this.resultComponents = [];
        this.element.innerHTML = "";
        for (let i = this.start; i < this.results.length && i < this.end; i++) {
            const component = new ResultComponent(this, this.resultComponents.length, this.results[i]);
            this.resultComponents.push(component);
            this.element.append(component.element);
        }
    }

    updatePages(): void {
        const newPages = Math.ceil(this.results.length / itemsPerPage);
        if (this.pages !== newPages) {
            this.setPages(newPages);
        }
    }

    setPages(pages: number): void {
        this.pages = pages;
        this.paginationPages.innerText = pages.toString(10);
        this.paginationNext.disabled = this.page >= this.pages;
        this.paginationLast.disabled = this.page >= this.pages - 1;
    }

    addResult(result: CoderOutput): void {
        for (let i = 0; i < this.results.length; i++) {
            // Sort smallest scores first (least distance from english bigram frequency)
            if (result.score < this.results[i].score) {
                this.results.splice(i, 0, result);
                this.updatePages();
                // If the element belongs on the current page
                if (i >= this.start && i < this.end) {
                    const index = i - this.start;
                    // Insert it before the element with a larger score
                    const component = new ResultComponent(this, this.resultComponents.length, result);
                    const otherComponent = this.resultComponents[index];
                    this.resultComponents.splice(index, 0, component);
                    this.element.insertBefore(component.element, otherComponent.element);
                    // If there are more results than items per page
                    if (this.resultComponents.length > itemsPerPage) {
                        // Remove the last result
                        this.element.removeChild((this.resultComponents.pop() as ResultComponent).element);
                    }
                }
                return; // after inserting result
            }
        }
        // Highest score, add to end
        this.results.push(result);
        this.updatePages();
        // If there are less results than items per page
        if (this.resultComponents.length <= itemsPerPage) {
            // Add this result to the bottom of this page
            const component = new ResultComponent(this, this.resultComponents.length, result);
            this.resultComponents.push(component);
            this.element.append(component.element);
        }
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
