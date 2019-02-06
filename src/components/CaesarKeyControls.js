import React from 'react'

function CaesarKeyLabel() {
  return <label htmlFor="key" className='cipher-widget__label'>ключ:</label>
}


function CaesarBreakKeyLabel() {
  return (
    <label htmlFor='key'
    className='cipher-widget__label cipher-widget__label_break'>
      Таблиця заміни з ключем:
    </label>
  )
}


export function CaesarKeyControls(props) {
  const label = <CaesarKeyLabel/>
  return (
    <div className='cipher-widget__control-column'>
      <CipherKeyControls {...props} label={label}/>
    </div>
  )
}

export function CaesarBreakKeyControls(props) {
  const label = <CaesarBreakKeyLabel/>
  return (
    <div>
      <CipherKeyControls {...props} label={label} />
    </div>
  )
}


function CipherKeyControls({cipherKey, updateCipherKey, label}) {
  return (
      <div className='cipher-widget__key-form'>
        {label}
        <input type="number" name="key"
            className='cipher-widget__key-input'
            value={cipherKey}
            onChange={updateCipherKey} />
      </div>
  )
}