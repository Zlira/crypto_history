import React from 'react'

import {ALPHABET_LEN} from '../ciphers/alphabet'
import { mod } from '../ciphers/mathHelpers'
import { encipher } from '../ciphers/caesar'


function trimKeyDifference(keyDiff) {
  // if keys are more than ALPHABET_LEN values apart there's no need to
  // show ALL the intermediate values
  return Math.abs(keyDiff) > ALPHABET_LEN
    ? ALPHABET_LEN * Math.sign(keyDiff) + keyDiff % ALPHABET_LEN
    : keyDiff
}

export function getIntermediateKeys(prevKey, currKey) {
  const valNum = Math.abs(trimKeyDifference(currKey - prevKey)) + 3
  const firstVal = Math.min(prevKey, currKey) - 1
  return [...Array(valNum).keys()].map(v => v + firstVal)
}


// todo refactor
export default class CipherTextField extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      animating: false,
    }

    this.animationTimeout = undefined
    this.prevCipherKey = this.props.cipherKey
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.cipherKey === this.props.cipherKey) {
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
    const {text, cipherKey, reverse} = this.props
    const vals = [...getIntermediateKeys(this.prevCipherKey, cipherKey)]
    const textsNum = vals.length
    const texts = vals.map(
      v =>
        <EnicpheredText text={text} cipherKey={v} key={v} reverse={reverse}
          className={v !== cipherKey? 'cipher-widget__text_is-neighbour' : ''}/>
    )
    const keys = vals.map(
      v =>
        <CipherKey cipherKey={v} key={v} reverse={reverse}
          className={v !== cipherKey? 'cipher-widget__text_is-neighbour' : ''}/>
    )
    // todo move this logic to separate function and test it
    const moveCoef = trimKeyDifference(this.prevCipherKey - cipherKey)
    const styleNotAnimating = {
      transform: moveCoef > 0
        ? `translateY(calc(${-textsNum + 3} * 10px + ${-textsNum + 3} * 1em))`
        : 'none'
    }
    const style = {
      transform: moveCoef < 0
        ? `translateY(calc(${moveCoef} * 10px + ${moveCoef} * 1em))`
        : 'none',
      transition: "transform .6s",
    }
    return  (
    <>
      <div className={'cipher-widget__key-column cipher-widget__column_sliding'}>
        <div style={this.state.animating? style : styleNotAnimating}>
          {keys}
        </div>
      </div>
      <div className={'cipher-widget__text-column cipher-widget__column_sliding'}>
        <div style={this.state.animating? style : styleNotAnimating}>
          {texts}
        </div>
      </div>
    </>
    )
  }
}

function CipherKey({cipherKey, reverse, className=''}) {
  if (reverse) {
    cipherKey = ALPHABET_LEN - cipherKey
    className = className + ' cipher-widger__text_is-reverse'
  }
  cipherKey = mod(cipherKey, ALPHABET_LEN)
  return <p className={'cipher-widget__text ' + className}>
    {cipherKey.toString().padStart(2, 0)}
  </p>
}

function EnicpheredText({text, cipherKey, reverse, className=''}) {
  cipherKey = mod(cipherKey, ALPHABET_LEN)
  const textClassName = reverse
    ? 'cipher-widget__text_plain'
    : 'cipher-widget__text_cipher'
  return (
    <p className={'cipher-widget__text ' + className + ' ' + textClassName}>
      {encipher(cipherKey, text)}
    </p>
  )
}
