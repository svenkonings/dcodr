export abstract class LazyComponent {
    protected abstract element: HTMLElement | undefined;

    /**
     * Lazy load element.
     */
    abstract getElement(): HTMLElement;

    getChildren(childClass: string): HTMLCollectionOf<HTMLElement> {
        return (this.element as HTMLElement).getElementsByClassName(childClass) as HTMLCollectionOf<HTMLElement>;
    }

    getChild(childClass: string): HTMLElement {
        return this.getChildren(childClass)[0];
    }
}
