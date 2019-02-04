import React from 'react'

import {ALPHABET_LEN} from '../ciphers/alphabet'
import { mod } from '../ciphers/mathHelpers'
import { encipher } from '../ciphers/caesar'


export function getIntermediateKeys(prevKey, currKey) {
  const valNum = Math.abs(currKey - prevKey) + 3
  const firstVal = Math.min(prevKey, currKey) - 1
  return [...Array(valNum).keys()].map(v => v + firstVal)
}


export default class CipherTextField extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      animating: false,
    }
    this.prevCipherKey = this.props.cipherKey
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.cipherKey !== '' &&
      prevProps.cipherKey !== this.props.cipherKey
    ) {
      this.prevCipherKey = prevProps.cipherKey
    }
    if (prevProps.cipherKey === this.props.cipherKey || this.props.cipherKey === '') {
      return
    }
    this.prevCipherKey = prevProps.cipherKey
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
    let {text, cipherKey} = this.props
    console.log('-----------------------')
    console.log('curr cipher key ', cipherKey)
    console.log('prev cipher key ', this.prevCipherKey)
    console.log('animating ', this.state.animating)
    if (cipherKey === '') {
      cipherKey = this.prevCipherKey
    }
    const vals = getIntermediateKeys(this.prevCipherKey, cipherKey)
    const textsNum = vals.length
    const texts = vals.map(
      v => <EnicpheredText text={text} cipherKey={v}
            className='neighbour text' key={v}/>
    )
    console.log('values ', vals)
    const moveCoef = this.prevCipherKey - cipherKey
    console.log('moveCoef ', moveCoef)
    const styleNotAnimating = {
      transform: moveCoef > 0
        ? `translateY(calc(${-textsNum + 3} * 10px + ${-textsNum + 3} * 1em))`
        : 'none'
    }
    console.log(styleNotAnimating.transform)
    const style = {
      transform: moveCoef < 0
        ? `translateY(calc(${moveCoef} * 10px + ${moveCoef} * 1em))`
        : 'none',
      transition: "all 1s",
    }
    return <div className={'cipher-widget-text'}>
      <div style={this.state.animating? style : styleNotAnimating}>
        {texts}
      </div>
    </div>
  }
}


function EnicpheredText({text, cipherKey, className}) {
  cipherKey = mod(cipherKey, ALPHABET_LEN)
  return (
    <p className={className}>
      {cipherKey.toString().padStart(2, 0) + ' ' + encipher(cipherKey, text)}
    </p>
  )
}
