import {Coder} from "./Coder";
import {varDef} from "../values/VarDef";
import {ValueType} from "../values/ValueType";
import {optionDef} from "../values/OptionDef";
import {range} from "../util/functions";

const abc = "abcdefghijklmnopqrstuvwxyz";
const ignore = true

export class Caesar extends Coder {
    readonly name = "Caesar Cipher";

    readonly varDefs = [varDef("shift", ValueType.INTEGER, ...range(1, 26))]

    readonly optionDefs = [
        optionDef("alphabet", ValueType.STRING, abc),
        optionDef("ignore case", ValueType.BOOLEAN, true)
    ];

    _encode(input: string, shift: number, alphabet: string = abc, ignoreCase: boolean = ignore): string {
        if (ignoreCase) {
            input = input.toLowerCase();
        }

        return input.split("").map(value => {
            const index = alphabet.indexOf(value);
            return index >= 0 ? alphabet.charAt((index + shift) % alphabet.length) : value;
        }).join("")
    }

    _decode(input: string, shift: number, alphabet: string = abc, ignoreCase: boolean = ignore): string {
        // Encode with reverse shift
        return this._encode(input, -shift, alphabet, ignoreCase);
    }

    _checkVars(input: string, shift: number, alphabet: string = abc, ignoreCase: boolean = ignore): Error | undefined {
        if (ignoreCase) {
            input = input.toLowerCase();
        }
        const inputMatches = input.split("").some(value => alphabet.includes(value));
        if (!inputMatches) {
            return Error("Input contains no characters from the alphabet");
        }
    }
}
