import React from 'react'

import CipherTextField from './CaesarTextField'
import './CipherWidget.css'
import { mod } from '../ciphers/mathHelpers';
import { ALPHABET_LEN } from '../ciphers/alphabet';


class CipherWidget extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      key: 0
    }
    this.updateCipherKey = this.updateCipherKey.bind(this)
  }

  updateCipherKey(e) {
    this.setState({
      key: parseInt(e.target.value)
    })
  }

  render() {
    return (
      <section className='cipher-widget'>
        <h3 className='cipher-widget__title'>{this.props.title}</h3>
        <CipherWidgetBody text={this.props.text}
          cipherKey={this.state.key} updateCipherKey={this.updateCipherKey}/>
      </section>
    )
  }
}


function CipherWidgetBody({text, cipherKey, updateCipherKey}) {
  return (
    <div className='cipher-widget__body'>
      <div className='cipher-widget__ref-section'>
        <div className='cipher-widget__control-column'>
          <p className='cipher-widget__label'>текст:</p>
        </div>
        <div className='cipher-widget__key-column'></div>
        <div className='cipher-widget__text-column'>
          <p className='cipher-widget__text'>{text}</p>
        </div>
      </div>
      <div className='cipher-widget__work-section'>
        <CipherKeyControls cipherKey={cipherKey} updateCipherKey={updateCipherKey}/>
        <CipherTextField text={text} cipherKey={cipherKey || 0}/>
      </div>
    </div>
  )
}


// this is for Caesar cipher specifically
function CipherKeyControls({cipherKey, updateCipherKey}) {
  return <div className='cipher-widget__control-column'>
    <div className='cipher-widget__key-form'>
      <label htmlFor="key" className='cipher-widget__label'>ключ:</label>
      <input type="number" name="key"
        className='cipher-widget__key-input'
        value={cipherKey}
        onChange={updateCipherKey} />
    </div>
  </div>
}


export default CipherWidget