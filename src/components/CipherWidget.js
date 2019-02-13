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
    return (
      <section className={'cipher-widget ' + this.props.className}>
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