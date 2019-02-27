import React from 'react'

import { monoAlphBreakText, Chapter2Text } from '../content/letterFrequency'
import './MonoalphabetBreakWidget.css'


export default function MonoalphabetBreakWidget({text}) {
  return (
    <section className="cipher-widget cipher-widget_monoalphabet">
      <h3 className='cipher-widget__title'>Метод одноалфавітної заміни: Злом</h3>
      <div className='cipher-widget__body'>
        <LetterFreques lettersInfo={monoAlphBreakText}/>
        <LetterFreques lettersInfo={Chapter2Text} upsidedown/>
        <p className="cipher-widget__secret-text cipher-widget__text ">
          {text}
        </p>
      </div>
    </section>
  )
}


function LetterFreques({lettersInfo, upsidedown}) {
  const letters = []
  for (let i=0; i < Object.keys(lettersInfo).length; i++) {
    let letter = lettersInfo[i]
    letters.push(
      <LetterFreq letter={letter.letter} freq={letter.freq} upsidedown={upsidedown}
        key={letter.letter} />
    )
  }
  return <div>{letters}</div>
}

function LetterFreq({letter, freq, upsidedown}) {
  const freqInd = <FreqIndicator freq={freq} upsidedown={upsidedown} />
  return <div className="cipher-widget__text cipher-widget__letter-freq">
    {upsidedown? null : freqInd}
    <div style={{width: "100%", textAlign: "center"}}>{letter}</div>
    {upsidedown? freqInd : null}
  </div>
}

function FreqIndicator({freq, upsidedown}) {
  const width = 14, height=42
  const freqR = Math.round(freq)
  const bars = []
  for (let i=0; i < freqR; i++) {
    bars.push(
      <line key={i} x1={0} x2={width} y1={i * 4 + 1} y2={i * 4 + 1}
        stroke="#00EB5F" strokeWidth={2} />
    )
  }
  const transform = upsidedown? 'translate(0, 3)' : `translate(${width}, ${height}) rotate(-180)`
  return (
    <svg width={width} height={height}>
      <title>{freq.toFixed(2) + '%'}</title>
      <g transform={transform}>{bars}</g>
    </svg>
  )
}