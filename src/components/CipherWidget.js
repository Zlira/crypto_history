import React from 'react'


import { ALPHABET_LEN } from '../ciphers/alphabet'
import { mod } from '../ciphers/mathHelpers'
import './CipherWidget.css'


function SuccessIndicator({isSuccess}) {
  const isSuccessClass = isSuccess? ' cipher-widget__success-indicator_is-success' : ''
  return (
    <div style={{position: 'relative'}}>
      <div className={'cipher-widget__success-indicator' + isSuccessClass}></div>
    </div>
  )
}


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
    const cipherKey = mod(parseInt(this.state.key || 0), ALPHABET_LEN)
    const success = cipherKey === this.props.successKey
    return (
      <section className={
          'cipher-widget ' + this.props.className
          + (success? ' cipher-widget_success' : '')
        }>
        <SuccessIndicator isSuccess={success} />
        <h3 className='cipher-widget__title'>{this.props.title}</h3>
        {this.props.renderBody({
          cipherKey_: this.state.key,
          updateCipherKey_: this.updateCipherKey,
        })}
      </section>
    )
  }
}


export default CipherWidget