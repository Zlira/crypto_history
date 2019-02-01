import { mod } from './mathHelpers'
import { FULL_ALPHADICT, ALPHABET_LEN } from './alphabet'

export function encipher(key, openText) {
  const res = openText
    .split('')
    .map(
      letter => FULL_ALPHADICT[
        mod((parseInt(FULL_ALPHADICT[letter]) + key), ALPHABET_LEN)
      ] || letter
    )
    .join('')
  return res
}

export function decipher(key, cipherText) {
  return encipher(-key, cipherText)
}
