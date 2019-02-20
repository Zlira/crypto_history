import React from 'react'

import {encipher, decipher } from '../ciphers/monoalphabet'

console.log(encipher('Мене звати пряничок!'))
console.log(decipher("%$#$ psxfw ocy#wzr*!"))


export default class monoalphabetWidget extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      openText: '',
      cipherText: '',
    }

    this.handleTextChange = this.handleTextChange.bind(this)
  }

  handleTextChange(e, isCipher) {
    const text = e.target.value
    const openText = isCipher? decipher(text) : text
    const cipherText = isCipher? text : encipher(text)
    this.setState({
      openText: openText,
      cipherText: cipherText
    })
  }

  render() {
    return <section className="cipher-widget cipher-widget_monoalphabet">
      <h3 className='cipher-widget__title'>Метод одноалфавітної заміни</h3>
      <div className="cipher-widget__body">
        <textarea className="cipher-widget__text cipher-widget__secret-text"
          value={this.state.openText} onChange={e => this.handleTextChange(e)}
        />
        <textarea className="cipher-widget__text cipher-widget__secret-text"
          value={this.state.cipherText} onChange={e => this.handleTextChange(e, true)}
        />
       </div>
    </section>
  }
}