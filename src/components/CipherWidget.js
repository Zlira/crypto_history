import React from 'react'

import {ALPHABET_LEN} from '../ciphers/alphabet'
import { encipher } from '../ciphers/caesar'


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
      key: e.target.value
    })
  }

  render() {
    return (
      <section className='cipher-widget'>
        <h3 className='cipher-widget-title'>{this.props.title}</h3>
        <CipherWidgetBody text={this.props.text}
          cipherKey={this.state.key} updateCipherKey={this.updateCipherKey}/>
      </section>
    )
  }
}


function CipherWidgetBody({text, cipherKey, updateCipherKey}) {
  return (
    <div className='cipher-widget-body'>
      <CipherKeyControls cipherKey={cipherKey} updateCipherKey={updateCipherKey}/>
      <CipherTextField text={text} cipherKey={cipherKey}/>
    </div>
  )
}


// this is for Caesar cipher specifically
function CipherKeyControls({cipherKey, updateCipherKey}) {
  return <form>
    <label htmlFor="key">ключ:</label>
    <input type="number" name="key"
      value={cipherKey}
      onChange={updateCipherKey}
      min={0} max={ALPHABET_LEN - 1}/>
  </form>
}


function CipherTextField({text, cipherKey}) {
  return <p>{encipher(cipherKey, text)}</p>
}

export default CipherWidget