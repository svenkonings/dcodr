import {Coder} from "./Coder";
import {VarDef} from "./VarDef";
import {VarType} from "./VarType";
import {range} from "./util";

export class Caesar extends Coder {
    readonly name: string = "Caesar Cipher";
    readonly varDefs: VarDef[] = [
        new VarDef("shift", VarType.INTEGER, ...range(1, 26)),
        new VarDef("alphabet", VarType.STRING, "abcdefghijklmnopqrstuvwxyz"),
        new VarDef("ignore case", VarType.BOOLEAN, true)
    ];

    _encode(input: string, shift: number, alphabet: string, ignoreCase: boolean): string {
        if (ignoreCase) {
            input = input.toLowerCase();
        }

        return input.split("").map(value => {
            const index = alphabet.indexOf(value);
            return index >= 0 ? alphabet.charAt((index + shift) % alphabet.length) : value;
        }).join("")
    }

    _decode(input: string, shift: number, alphabet: string, ignoreCase: boolean): string {
        // Encode with reverse shift
        return this._encode(input, -shift, alphabet, ignoreCase);
    }

    _checkArgs(input: string, shift: number, alphabet: string, ignoreCase: boolean): string | undefined {
        if (ignoreCase) {
            input = input.toLowerCase();
        }
        const inputMatches = input.split("").some(value => alphabet.includes(value));
        if (!inputMatches) {
            return "Input contains no characters from the alphabet"
        }
    }
}
