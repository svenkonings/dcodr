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

    value: ResultComponent[];
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

        this.value = [];
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
        this.value = [];
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

        this.element.innerHTML = "";
        for (let i = this.start; i < this.value.length && i < this.end; i++) {
            this.element.append(this.value[i].getElement());
        }
    }

    updatePages(): void {
        const newPages = Math.ceil(this.value.length / itemsPerPage);
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
        const component = new ResultComponent(this, this.value.length, result);
        for (let i = 0; i < this.value.length; i++) {
            const otherComponent = this.value[i];
            // Sort smallest scores first (least distance from english bigram frequency)
            if (result.score < otherComponent.result.score) {
                this.value.splice(i, 0, component);
                this.updatePages();
                // If the element belongs on the current page
                if (i >= this.start && i < this.end) {
                    // Insert it before the element with a larger score
                    this.element.insertBefore(component.getElement(), otherComponent.getElement());
                    // If there are more results than the end of this page
                    if (this.value.length > this.end) {
                        // Remove the result that belongs to the next page
                        this.element.removeChild(this.value[this.end].getElement());
                    }
                }
                return; // after inserting result
            }
        }
        // Highest score, add to end
        this.value.push(component);
        this.updatePages();
        // If there are less results than the end of this page
        if (this.value.length <= this.end) {
            // Add this result to the bottom of this page
            this.element.append(component.getElement());
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
