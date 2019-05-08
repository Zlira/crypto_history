import { ALPHABET } from './alphabet'

export const KEY_1 = "xhsane$gipwb@m*&%#roc^fvlujzkqtdy"
export const KEY_2 = "%&hu*txswm$nblkiya@oz^jgqfpdc#rev"


export function makeSubstDict(key, reverse=false) {
  const substDict = {}
  for (let i=0; i < ALPHABET.length; i++) {
    if (reverse) {
      substDict[key[i]] = ALPHABET[i]
    } else {
      substDict[ALPHABET[i]] = key[i]
    }
  }
  return substDict
}

function _cipher(substDict, text) {
  return text
    .split('')
    .map(l => substDict[l.toLowerCase()] || l)
    .join('')
}

export function encipher(text, key) {
  key = key || KEY_1
  return _cipher(makeSubstDict(key), text)
}

export function decipher(text, key) {
  key = key || KEY_1
  return _cipher(makeSubstDict(key, true), text)
}
