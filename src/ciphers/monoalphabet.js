import { ALPHABET } from './alphabet'

export const KEY_1 = "xhsane$gipwb@m*&%#roc^fvlujzkqtdy"
const SUBST_DICT = {}
for (let i=0; i < ALPHABET.length; i++) {
  SUBST_DICT[ALPHABET[i]] = KEY_1[i]
  SUBST_DICT[KEY_1[i]] = ALPHABET[i]
}

console.log(SUBST_DICT)

export function encipher(text) {
  return text
    .split('')
    .map(l => SUBST_DICT[l.toLowerCase()] || l)
    .join('')
}


export function decipher(text) {
  return encipher(text)
}
