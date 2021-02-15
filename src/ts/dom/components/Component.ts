export abstract class Component {
    abstract readonly element: HTMLElement;

    getChildren(childClass: string): HTMLCollectionOf<HTMLElement> {
        return this.element.getElementsByClassName(childClass) as HTMLCollectionOf<HTMLElement>;
    }

    getChild(childClass: string): HTMLElement {
        return this.getChildren(childClass)[0];
    }
}
