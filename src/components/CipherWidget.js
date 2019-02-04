import React from 'react'

import CipherTextField from './CaesarTextField'
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
      <CipherTextField text={text} cipherKey={cipherKey || 0}/>
    </div>
  )
}


// this is for Caesar cipher specifically
function CipherKeyControls({cipherKey, updateCipherKey}) {
  return <div className='cipher-widget-key-contorls'>
    <label htmlFor="key">ключ:</label>
    <input type="number" name="key"
      className='cipher-widget-key-input'
      value={cipherKey}
      onChange={updateCipherKey} />
  </div>
}


export default CipherWidget