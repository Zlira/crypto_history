import React from 'react'

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
    const success = parseInt(this.state.key) === this.props.successKey
    console.log(success, this.state.key, this.props.successKey)
    return (
      <section className={
          'cipher-widget ' + this.props.className
          + (success? ' cipher-widget_success' : '')
        }>
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