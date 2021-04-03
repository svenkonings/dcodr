import 'bootstrap';
import '../../scss/main.scss';
import {InputComponent} from "./components/input/InputComponent";
import {OutputComponent} from "./components/output/OutputComponent";

const worker = new Worker("worker.js");
const inputContainer = new InputComponent(worker);
const outputContainer = new OutputComponent(worker);
console.log(inputContainer, outputContainer);
