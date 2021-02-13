import 'bootstrap';
import '../../scss/main.scss';

import {coders, getCoder} from "../lib/coders/Coders";
import {Coder} from "../lib/coders/Coder";

const BRUTE_FORCE = "Brute-force";

const steps = document.getElementById("steps") as HTMLDivElement;
const addStepButton = document.getElementById("add-step") as HTMLButtonElement;

init();

function init(): void {
    addStep(); // Add first step
    addStepButton.addEventListener("click", addStep);
}

function addStep(): void {
    const step = getTemplate("step");
    initCoderSelect(step);
    initRemoveButton(step);
    initAddVariableButton(step);

    steps.insertBefore(step, addStepButton);
    updateRemoveButtons();
}


function removeStep(step: HTMLElement): void {
    if (steps.childElementCount > 2) {
        step.remove();
        updateRemoveButtons();
    } else {
        alert("Can't remove last step.");
    }
}

function addVariable(step: HTMLElement) {
    const variables = getChild(step, "variables");
    const row = getTemplate("bruteForceRow");
    const name = getChild(row, "value-name");
    const valueRemoveButton = getChild(row, "value-remove");
    name.innerText = "Variable " + (variables.children.length + 1);
    valueRemoveButton.addEventListener("click", () => removeVariable(row));
    variables.append(row);
}

function removeVariable(row: HTMLElement) {
    let nextRow = row.nextElementSibling;
    while (nextRow !== null) {
        const name = getChild(nextRow, "value-name")
        renameVariable(name);
        nextRow = nextRow.nextElementSibling;
    }
    row.remove();
}

function renameVariable(name: HTMLElement) {
    const prefix = "Variable ";
    const number = name.innerText.substring(prefix.length);
    const newNumber = (+number - 1).toString();
    name.innerText = prefix + newNumber;
}

function initCoderSelect(step: HTMLElement): void {
    const coderSelect = getChild(step, "coder") as HTMLSelectElement;
    addOption(coderSelect, BRUTE_FORCE);
    for (const coderName of coders) {
        addOption(coderSelect, coderName);
    }
    coderSelect.addEventListener("change", event => {
        const target = event.target as HTMLOptionElement;
        selectCoder(step, target.value);
    });
    selectCoder(step, BRUTE_FORCE);
}

function addOption(select: HTMLSelectElement, name: string): void {
    const option = document.createElement("option");
    option.text = name;
    select.add(option);
}

function initRemoveButton(step: HTMLElement): void {
    const removeStepButton = getChild(step, "remove-step");
    removeStepButton.addEventListener("click", () => removeStep(step));
}

function updateRemoveButtons(): void {
    const buttons = getChildren(steps, "remove-step");
    if (buttons.length == 1) {
        buttons[0].hidden = true;
    } else if (buttons.length > 1) {
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].hidden = false;
        }
    }
}

function initAddVariableButton(step: HTMLElement) {
    const addVariableButton = getChild(step, "add-variable");
    addVariableButton.addEventListener("click", () => addVariable(step));
}

function selectCoder(step: HTMLElement, coderName: string): void {
    const bruteForce = coderName === BRUTE_FORCE;

    const addVariableButton = getChild(step, "add-variable");
    addVariableButton.hidden = !bruteForce;

    const variablesHead = getChild(step, "variables-head");
    const variables = getChild(step, "variables");
    const settingsHead = getChild(step, "settings-head");
    const settings = getChild(step, "settings");

    variables.innerHTML = "";
    settings.innerHTML = "";

    if (bruteForce) {
        variablesHead.hidden = false;
        variables.hidden = false;
        settingsHead.hidden = true;
        settings.hidden = true;
    } else {
        const coder = getCoder(coderName) as Coder;

        const hasVars = coder.varDefs.length > 0;
        variablesHead.hidden = !hasVars;
        variables.hidden = !hasVars;
        for (const varDef of coder.varDefs) {
            const row = getTemplate("valueRow");
            const name = getChild(row, "value-name");
            const input = getChild(row, "value-input") as HTMLInputElement;
            name.innerText = varDef.name;
            input.placeholder = varDef.type;
            variables.append(row);
        }

        const hasOptions = coder.varDefs.length > 0;
        settingsHead.hidden = !hasOptions;
        settings.hidden = !hasOptions;
        for (const optionDef of coder.optionDefs) {
            const row = getTemplate("valueRow");
            const name = getChild(row, "value-name");
            const input = getChild(row, "value-input") as HTMLInputElement;
            name.innerText = optionDef.name;
            input.value = optionDef.defaultValue.toString();
            settings.append(row);
        }
    }
}

function getTemplate(templateId: string): HTMLElement {
    const template = document.getElementById(templateId) as HTMLTemplateElement;
    const child = template.content.firstElementChild as HTMLElement;
    return child.cloneNode(true) as HTMLElement;
}

function getChildren(element: Element, childClass: string): HTMLCollectionOf<HTMLElement> {
    return element.getElementsByClassName(childClass) as HTMLCollectionOf<HTMLElement>;
}

function getChild(element: Element, childClass: string): HTMLElement {
    return getChildren(element, childClass)[0];
}
