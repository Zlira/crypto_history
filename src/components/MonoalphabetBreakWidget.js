import React from 'react'

import { monoAlphBreakText, Chapter2Text } from '../content/letterFrequency'
import './MonoalphabetBreakWidget.css'


export default class MonoalphabetBreakWidget extends React.Component {
  constructor(props) {
    super(props)

    const letterCount = Object.keys(monoAlphBreakText).length
    this.state = {
      pairings: Array(letterCount).fill(false),
      highlightedLetter: null,
    }

    this.toggleLettePairing = this.toggleLettePairing.bind(this)
    this.processText = this.processText.bind(this)
    this.setHighlighted = this.setHighlighted.bind(this)
  }

  toggleLettePairing(index) {
    const newPairings = this.state.pairings.map(
      (isPaired, i) => i === index? !isPaired : isPaired
    )
    this.setState({
      pairings: newPairings
    })
  }

  setHighlighted(letter) {
    this.setState({
      highlightedLetter: letter
    })
  }

  processText() {
    const keyIndexes = this.state.pairings.map(
      (e, i) => e? i : null
    ).filter(e => e || e === 0)
    const substDict = {}
    for (let key of keyIndexes) {
      substDict[monoAlphBreakText[key].letter] = Chapter2Text[key].letter
    }
    const getClass = l => l === this.state.highlightedLetter? 'cipher-widget__text_higlighted ' : ''
    const letters = this.props.text.split('').map(
      (l, i) => substDict[l]
        ? <span className={getClass(l) + "cipher-widget__text_plain"}  key={i}>{substDict[l]}</span>
        : <span className={getClass(l)} key={i}>{l}</span>
    )
    return letters
  }

  render() {
    return (
        <section className="cipher-widget cipher-widget_monoalphabet">
        <h3 className='cipher-widget__title'>Метод одноалфавітної заміни: Злом</h3>
        <div className='cipher-widget__body'>
          <LetterFreques lettersInfo={monoAlphBreakText} handleHover={this.setHighlighted}/>
          <PairingSwitches paired={this.state.pairings} handleClick={this.toggleLettePairing} />
          <LetterFreques lettersInfo={Chapter2Text} upsidedown isPlainText handleHover={e => null}/>
          <p className="cipher-widget__secret-text cipher-widget__text ">
            {this.processText()}
          </p>
        </div>
        </section>
    )
  }
}


function LetterFreques({lettersInfo, upsidedown, isPlainText, handleHover}) {
  const letters = []
  for (let i=0; i < Object.keys(lettersInfo).length; i++) {
    let letter = lettersInfo[i]
    letters.push(
      <LetterFreq letter={letter.letter} freq={letter.freq}
        upsidedown={upsidedown} isPlainText={isPlainText} handleHover={handleHover}
        key={letter.letter} />
    )
  }
  return <div className="cipher-widget__letters-freq-cont">{letters}</div>
}

function LetterFreq({letter, freq, upsidedown, isPlainText, handleHover}) {
  const freqInd = <FreqIndicator freq={freq} upsidedown={upsidedown} isPlainText={isPlainText} />
  const textClassName = "cipher-widget__text " + (isPlainText? 'cipher-widget__text_plain' : '')
  return (
    <div className="cipher-widget__letter-freq"
      onMouseOver={() => handleHover(letter)} onMouseOut={() => handleHover(null)}>
      {upsidedown? null : freqInd}
      <div className={textClassName}>{letter}</div>
      {upsidedown? freqInd : null}
    </div>
  )
}

function FreqIndicator({freq, upsidedown, isPlainText}) {
  const width = 14, height=42
  const freqR = Math.round(freq)
  const bars = []
  const barClassName = "cipher-widget__pair-indicator-bar " +
    (isPlainText? "cipher-widget__pair-indicator-bar_plain" : "")
  for (let i=0; i < freqR; i++) {
    bars.push(
      <line key={i} x1={0} x2={width} y1={i * 4 + 1} y2={i * 4 + 1}
        className={barClassName} />
    )
  }
  const transform = upsidedown? '' : `translate(${width}, ${height}) rotate(-180)`
  return (
    <svg width={width} height={height}>
      <title>{freq.toFixed(2) + '%'}</title>
      <g transform={transform}>{bars}</g>
    </svg>
  )
}


function PairingSwitches({paired, handleClick}) {
  const switches = paired.map(
    (isPaired, i) => <div key={i} className="cipher-widget__pair-indicator-outer" onClick={() => handleClick(i)}>
     <div className={
       "cipher-widget__pair-indicator-inner " +
       (isPaired? "cipher-widget__pair-indicator-inner_active" : null )
     }></div>
    </div>
  )
  return <div> {switches} </div>
}