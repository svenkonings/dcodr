import {Coder} from "./Coder";
import {Caesar} from "./Caesar";

const caesar = new Caesar();

export function getCoder(name: string): Coder | undefined {
    switch (name) {
        case caesar.name:
            return caesar;
    }
}
