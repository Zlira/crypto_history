export const ALPHABET = 'абвгґдеєжзиіїйклмнопрстуфхцчшщьюя'
export const ALPHABET_LEN = ALPHABET.length
const ALPHABET_DICT = {...ALPHABET.split('')}
const REVERSE_DICT = {}
for (const [key, val] of Object.entries(ALPHABET_DICT)) {
    REVERSE_DICT[val] = key
}
export const FULL_ALPHADICT = {...ALPHABET_DICT, ...REVERSE_DICT}