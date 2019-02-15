import React from 'react'

import { ALPHABET, ALPHABET_LEN } from '../ciphers/alphabet'
import { decipher } from '../ciphers/caesar'
import { mod } from '../ciphers/mathHelpers'
import CipherWidget from './CipherWidget'
import {CaesarBreakKeyControls} from './CaesarKeyControls'


export default function CaesarBreakWidget({title, text, successKey}){
  const renderBody = ({
    updateCipherKey_, cipherKey_
  }) => <CeasarBreakBody cipherKey={cipherKey_} updateCipherKey={updateCipherKey_} text={text}/>
  return (
      <CipherWidget title={title} renderBody={renderBody} successKey={successKey} />
  )
}


class CeasarBreakBody extends React.Component {
  constructor(props) {
    super(props)

    this.getText = this.getText.bind(this)
    this.state = {
      text: this.getText()
    }
    this.splitInitText = this.props.text.split(' ')
  }

  componentWillUnmount() {
    clearInterval(this.textUpdateInterval)
  }

  componentDidUpdate(prevProps) {
    if (this.props.cipherKey !== prevProps.cipherKey) {
      const cipherKey = mod(prevProps.cipherKey, ALPHABET_LEN)
      this.setState({text: decipher(cipherKey, this.props.text)})
      this.textUpdateCount = 0
      clearInterval(this.textUpdateInterval)
      this.textUpdateInterval = setInterval(
        () => {
          this.setState(prevState => ({text: this.getText(prevState.text, this.textUpdateCount)}))
          this.textUpdateCount = this.textUpdateCount + 1;
          if (this.textUpdateCount >= this.splitInitText.length) {
            clearInterval(this.textUpdateInterval)
          }
        }, 10
      )
    }
  }

  getText(prevText, step) {
    // TODO this can be a bit CPU heavy, so test it on some small power setting
    const cipherKey = mod(this.props.cipherKey, ALPHABET_LEN)
    const text = this.props.text || ''
    const cursor = "_"
    if (!prevText) {
      return decipher(cipherKey, text)
    }
    // already deciphered with new key, the last two symbols presumably are '_ ' so we cut them off
    let preTextLen = this.splitInitText.slice(0, step).reduce((acc, el) => acc + el.length, 0) + step - 2
    preTextLen = Math.max(preTextLen, 0)
    const preText = prevText.slice(0, preTextLen)

    // new text to decipher, sometimes there's a race condition and the step is
    // larger than number of words in text, no additional actions are required in that case,
    // just return the previous text
    let textToDecipher = this.splitInitText[step]
    if (!textToDecipher) {
      return prevText
    }
    // the last letter of the last word from previuos step to replace '_'
    const lastPreWord = this.splitInitText[step - 1]
    if (lastPreWord) {
      textToDecipher = lastPreWord[lastPreWord.length - 1] + ' ' + textToDecipher
    }
    let newText = decipher(cipherKey, textToDecipher)
    newText = newText.slice(0, newText.length - 1) + cursor + ' '
    const postText = prevText.slice(preTextLen + newText.length, prevText.length)
    return preText + newText + postText
  }

  render() {
    const cipherKey = mod(this.props.cipherKey, ALPHABET_LEN)
    return <div className='cipher-widget__body'>
      <div className="cipher-widget__subst-title">
        <CaesarBreakKeyControls {...this.props}/>
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
          {this.state.text}
        </p>
      </div>
    </div>
  }
}