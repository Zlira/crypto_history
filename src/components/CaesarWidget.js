import React from 'react'

import CipherWidget from './CipherWidget'
import CipherTextField from './CaesarTextField'
import {CaesarKeyControls} from './CaesarKeyControls'


export default function CaesarCipherWidget({title, text, cipherKey, reverse}) {
  const renderBody = ({cipherKey_, updateCipherKey_}) => {
    return (
      <CaesarBody text={text} reverse={reverse}
        cipherKey={cipherKey_} updateCipherKey={updateCipherKey_}/>
    )
  }
  return <CipherWidget renderBody={renderBody} cipherKey={cipherKey} title={title}
           className={reverse? 'cipher-widget_decipher' : 'cipher-widget_enicpher'}/>
}


function CaesarBody({text, cipherKey, updateCipherKey, reverse}) {
  const textClassName = reverse
    ? 'cipher-widget__text_cipher'
    : 'cipher-widget__text_plain'
  return (
    <div className='cipher-widget__body'>
      <div className='cipher-widget__ref-section'>
        <div className='cipher-widget__control-column'>
          <p className='cipher-widget__label'>
            {reverse? 'шифротекст:' : 'текст:'}
          </p>
        </div>
        <div className='cipher-widget__key-column'></div>
        <div className='cipher-widget__text-column'>
          <p className={'cipher-widget__text ' + textClassName}>{text}</p>
        </div>
      </div>
      <div className='cipher-widget__work-section'>
        <CaesarKeyControls cipherKey={cipherKey} updateCipherKey={updateCipherKey}/>
        <CipherTextField text={text}
          cipherKey={(reverse? -parseInt(cipherKey) : parseInt(cipherKey)) || 0}
          reverse={reverse}
        />
      </div>
    </div>
  )
}

