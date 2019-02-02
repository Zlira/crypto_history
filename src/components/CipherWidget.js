import React from 'react'

import {ALPHABET_LEN} from '../ciphers/alphabet'
import { mod } from '../ciphers/mathHelpers'
import { encipher } from '../ciphers/caesar'
import './CipherWidget.css'


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
      key: e.target.value && mod(e.target.value, ALPHABET_LEN)
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
  return <div className='cipher-widget-key-contorls'>
    <p>{mod(cipherKey -1, ALPHABET_LEN) }</p>
    <form>
      <label htmlFor="key">ключ:</label>
      <input type="number" name="key"
        className='cipher-widget-key-input'
        value={cipherKey}
        onChange={updateCipherKey} />
    </form>
    <p>{mod(cipherKey + 1, ALPHABET_LEN)}</p>
  </div>
}


class CipherTextField extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      animating: false,
    }
  }

  componentWillUpdate(prevProps) {
    if (prevProps.cipherKey === this.props.cipherKey) {
      return
    }
    this.setState({animating: false})
    this.animationTimeout = setTimeout(
      () => this.setState({animating: true}),
      200
    )
  }

  componentWillUnmount() {
    clearTimeout(this.animationTimeout)
  }

  render() {
    const {text, cipherKey} = this.props
    return <div className={'cipher-widget-text'}>
      <div className={this.state.animating? 'shifted-texts' : ''}>
        <EnicpheredText text={text} cipherKey={cipherKey-2} className='neighbour text'/>
        <EnicpheredText text={text} cipherKey={cipherKey-1} className='neighbour text'/>
        <EnicpheredText text={text} cipherKey={cipherKey} className='main text'/>
        <EnicpheredText text={text} cipherKey={cipherKey+1} className='neighbour text'/>
      </div>
    </div>
  }
}


function EnicpheredText({text, cipherKey, className}) {
  return (
    <p className={className}>{encipher(cipherKey, text)}</p>
  )
}

export default CipherWidget