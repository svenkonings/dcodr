export function getTemplate(templateId: string): HTMLElement {
    const template = document.getElementById(templateId) as HTMLTemplateElement;
    const child = template.content.firstElementChild as HTMLElement;
    return child.cloneNode(true) as HTMLElement;
}
