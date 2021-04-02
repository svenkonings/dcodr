import {Coder} from "./Coder";
import {Caesar} from "./Caesar";

export const BRUTE_FORCE = "Brute-force";

const caesar = new Caesar();

export const CODERS: Coder[] = [
    caesar
];

export function getCoder(name: string): Coder | undefined {
    switch (name) {
        case caesar.name:
            return caesar;
    }
}
