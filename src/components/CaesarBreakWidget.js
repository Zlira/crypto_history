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
      <tbody>
        <tr>
          <td className="cipher-widget__subst-label">шифротекст: </td>
          <td className="cipher-widget__text cipher-widget__text_cipher">{ALPHABET}</td>
        </tr>
        <tr>
          <td className="cipher-widget__subst-label ">відкритий текст: </td>
          <td className="cipher-widget__text cipher-widget__text_plain">
            {ALPHABET.slice(cipherKey) + ALPHABET.slice(0, cipherKey)}
          </td>
        </tr>
      </tbody>
    </table>
    <div className="cipher-widget__secret-text-cont">
      <p className={
        "cipher-widget__secret-text cipher-widget__text " +
        (cipherKey === 0? 'cipher-widget__text_cipher' : 'cipher-widget__text_plain')
      }>
        {decipher(cipherKey, text)}
      </p>
    </div>
  </div>

}