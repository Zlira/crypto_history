import { ALPHABET } from './alphabet'

export const KEY_1 = "xhsane$gipwb@m*&%#roc^fvlujzkqtdy"
const SUBST_DICT = {}
const SUBST_DICT_REVERSE = {}
for (let i=0; i < ALPHABET.length; i++) {
  SUBST_DICT[ALPHABET[i]] = KEY_1[i]
  SUBST_DICT_REVERSE[KEY_1[i]] = ALPHABET[i]
}

function _cipher(substDict, text) {
  return text
    .split('')
    .map(l => substDict[l.toLowerCase()] || l)
    .join('')
}

export function encipher(text) {
  return _cipher(SUBST_DICT, text)
}

export function decipher(text) {
  return _cipher(SUBST_DICT_REVERSE, text)
}
