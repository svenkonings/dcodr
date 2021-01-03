import {Caesar} from '../lib/Caesar';

const caesar = new Caesar();
const encoded = caesar.encode("Hello world!", "1", "abcdefghijklmnopqrstuvwxuz", "true");
const decoded = caesar.decode(encoded, "1", "abcdefghijklmnopqrstuvwxuz", "true")
console.log(encoded);
console.log(decoded);
