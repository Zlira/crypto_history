import React from 'react'

import { ALPHABET, ALPHABET_LEN } from '../ciphers/alphabet'
import { decipher } from '../ciphers/caesar'
import { mod } from '../ciphers/mathHelpers'
import CipherWidget from './CipherWidget'
import {CaesarBreakKeyControls} from './CaesarKeyControls'


export default function CaesarBreakWidget({title, text}){
  const renderBody = ({
    updateCipherKey_, cipherKey_
  }) => <CeasarBreakBody cipherKey={cipherKey_} updateCipherKey={updateCipherKey_} text={text}/>
  return (
      <CipherWidget title={title} renderBody={renderBody}/>
  )
}


function CeasarBreakBody(props) {
  const cipherKey = mod(props.cipherKey, ALPHABET_LEN)
  const text = props.text || ''
  return <div>
    <CaesarBreakKeyControls {...props}/>
    <div>
      <p>{ALPHABET}</p>
      <p>{ALPHABET.slice(cipherKey) + ALPHABET.slice(0, cipherKey)}</p>
    </div>
    <div>
      <p>{decipher(cipherKey, text)}</p>
    </div>
  </div>

}