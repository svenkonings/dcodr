import {Coder} from "./Coder";
import {Caesar} from "./Caesar";
import {Vigenere} from "./Vigenere";

export const BRUTE_FORCE = "Brute-force";

const caesar = new Caesar();
const vigenere = new Vigenere();

export const CODERS: Coder[] = [
    caesar,
    vigenere
];

export function getCoder(name: string): Coder | undefined {
    switch (name) {
        case caesar.name:
            return caesar;
        case vigenere.name:
            return vigenere;
    }
}
