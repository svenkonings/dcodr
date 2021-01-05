import {Caesar} from '../lib/coders/Caesar';

const caesar = new Caesar();
{
    const encoded = caesar._encode("Hello world!", 1);
    const decoded = caesar._decode(encoded, 1)
    console.log(encoded);
    console.log(decoded);
}
{
    const encoded = caesar.encode("Hello world!", "1");
    const decoded = caesar.decode(encoded, "1")
    console.log(encoded);
    console.log(decoded);
}
