import en from './en.json';
import fr from './fr.json';
import enMx from './en-mx.json';

// NOTE 1 : Ensure that each key in the following object is formatted according to the specified pattern: "en-US" or 'en-MX'.
//          The language code before the '-' should be lowercase, while all characters after the '-' should be uppercase.

// NOTE 2 : Ensure that the object name 'exp_lang' remains unchanged; otherwise, it may not function as expected.
// NOTE 3 : For the default or fallback language, use the key 'en' exclusively, as demonstrated in the following object.
const exp_lang: any = { en: en, 'fr-LU': fr, 'en-MX': enMx };

export { exp_lang };
