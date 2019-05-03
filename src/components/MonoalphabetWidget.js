import React from 'react'

import {encipher, decipher, KEY_1 } from '../ciphers/monoalphabet'
import { ALPHABET, FULL_ALPHADICT } from '../ciphers/alphabet'
import SubstTable from './SubstTable'


export default class monoalphabetWidget extends React.Component {
  constructor(props) {
    super(props)
    const initText = 'тут ти можеш ввести текст, який хочеш зашифрувати'
    this.state = {
      openText: initText,
      cipherText: encipher(initText),
      highlightIndex: null,
    }

    this.handleTextChange = this.handleTextChange.bind(this)
  }

  handleTextChange(e, isCipher) {
    const text = e.target.value
    const prevText = isCipher? this.state.cipherText : this.state.openText
    let highlightIndex
    let highlightLetter
    if (text.length - prevText.length === 1) {
      for (let i = 0; i < text.length; i++) {
        if (text[i] !== prevText[i]) {
          if (isCipher && ALPHABET.includes(text[i].toLowerCase())) {
            break
          }
          highlightLetter = isCipher? decipher(text[i]) : text[i]
          highlightLetter = highlightLetter && highlightLetter.toLowerCase()
          highlightIndex = FULL_ALPHADICT[highlightLetter]
          break
        }
      }
    }
    const openText = isCipher? decipher(text) : text
    const cipherText = isCipher? text : encipher(text)
    this.setState({
      openText: openText,
      cipherText: cipherText,
      highlightIndex: highlightIndex,
    })
  }

  render() {
    return <section className="cipher-widget cipher-widget_monoalphabet">
      <h3 className='cipher-widget__title'>Метод одноалфавітної заміни</h3>
      <div className="cipher-widget__body">
        <MonoalphabetInput
          title="Відкритий текст"
          value={this.state.openText}
          handleChange={e => this.handleTextChange(e)}
          isPlain
        />
        <h4 className="cipher-widget__section_title">Таблиця заміни</h4>
        <SubstTable
          openAlphabet={ALPHABET}
          cipherAlphabet={KEY_1}
          highlightIndex={this.state.highlightIndex}
        />
        <MonoalphabetInput
          title="Шифротекст"
          value={this.state.cipherText}
          handleChange={e => this.handleTextChange(e, true)}
        />
       </div>
    </section>
  }
}

function MonoalphabetInput({title, value, handleChange, isPlain}) {
  const className = "cipher-widget__text cipher-widget__secret-text "
    + (isPlain? "cipher-widget__text_plain" : "")
  return (
    <div className="cipher-widget_monolaphabet__input">
      <h4 className="cipher-widget__section_title">{title}</h4>
      <textarea className={className} rows={1}
      value={value} onChange={handleChange}
      />
    </div>
  )
}