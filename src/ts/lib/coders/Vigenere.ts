import {Coder} from "./Coder";
import {varDef} from "../values/VarDef";
import {ValueType} from "../values/ValueType";
import {optionDef} from "../values/OptionDef";
import {mod} from "../util/functions";
import {abc} from "../util/constants";

// TODO: Add bruteforce options
export class Vigenere extends Coder {
    readonly name = "Vigenere Cipher";

    readonly varDefs = [varDef("key", ValueType.STRING)]

    readonly optionDefs = [
        optionDef("alphabet", ValueType.STRING, abc),
        optionDef("ignore case", ValueType.BOOLEAN, true)
    ];

    _encode(input: string, key: string, alphabet: string = abc, ignoreCase = true): string {
        if (ignoreCase) {
            input = input.toLowerCase();
            key = key.toLowerCase();
            alphabet = alphabet.toLowerCase();
        }

        const splitKey = key.split("");
        let i = 0;
        return input.split("").map(value => {
            const inputVal = alphabet.indexOf(value);
            if (inputVal >= 0) {
                const keyVal = alphabet.indexOf(splitKey[i]);
                i = mod(i + 1, splitKey.length);
                return alphabet.charAt(mod((inputVal + keyVal), alphabet.length));
            } else {
                return value;
            }
        }).join("");
    }

    _decode(input: string, key: string, alphabet: string = abc, ignoreCase = true): string {
        if (ignoreCase) {
            input = input.toLowerCase();
            key = key.toLowerCase();
            alphabet = alphabet.toLowerCase();
        }

        const splitKey = key.split("");
        let i = 0;
        return input.split("").map(value => {
            const inputVal = alphabet.indexOf(value);
            if (inputVal >= 0) {
                const keyVal = alphabet.indexOf(splitKey[i]);
                i = mod(i + 1, splitKey.length);
                return alphabet.charAt(mod((inputVal - keyVal), alphabet.length));
            } else {
                return value;
            }
        }).join("");
    }

    _checkVars(input: string, key: string, alphabet: string = abc, ignoreCase = true): Error | undefined {
        if (ignoreCase) {
            input = input.toLowerCase();
            key = key.toLowerCase();
            alphabet = alphabet.toLowerCase();
        }
        const inputMatches = input.split("").some(value => alphabet.includes(value));
        if (!inputMatches) {
            return Error("Input contains no characters from the alphabet");
        }
        const keyMatches = key.split("").every(value => alphabet.includes(value));
        if (!keyMatches) {
            return Error("Key contains characters not in the alphabet");
        }
    }
}
