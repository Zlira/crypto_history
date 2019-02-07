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
  return <div className='cipher-widget__body'>
    <div className="cipher-widget__subst-title">
      <CaesarBreakKeyControls {...props}/>
    </div>
    <table className='cipher-widget__subst-table'>
      <tr>
        <td className="cipher-widget__subst-label">шифротекст: </td>
        <td className="cipher-widget__text">{ALPHABET}</td>
      </tr>
      <tr>
        <td className="cipher-widget__subst-label">відкритий текст: </td>
        <td className="cipher-widget__text">
          {ALPHABET.slice(cipherKey) + ALPHABET.slice(0, cipherKey)}
        </td>
      </tr>
    </table>
    <div className="cipher-widget__secret-text-cont">
      <p className="cipher-widget__secret-text">
        {decipher(cipherKey, text)}
      </p>
    </div>
  </div>

}