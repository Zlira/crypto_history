import React from 'react'

import { monoAlphBreakText } from '../content/letterFrequency'
import './MonoalphabetBreakWidget.css'


export default function MonoalphabetBreakWidget({text}) {
  return (
    <section className="cipher-widget cipher-widget_monoalphabet">
      <h3 className='cipher-widget__title'>Метод одноалфавітної заміни: Злом</h3>
      <div className='cipher-widget__body'>
        <LetterFreques lettersInfo={monoAlphBreakText}/>
        <p className="cipher-widget__secret-text cipher-widget__text ">
          {text}
        </p>
      </div>
    </section>
  )
}


function LetterFreques({lettersInfo}) {
  const letters = []
  for (let i=0; i < Object.keys(lettersInfo).length; i++) {
    let letter = lettersInfo[i]
    letters.push(
      <LetterFreq letter={letter.letter} freq={letter.freq} key={letter.letter} />
    )
  }
  return <div>{letters}</div>
}

function LetterFreq({letter, freq}) {
  return <div className="cipher-widget__text cipher-widget__letter-freq">
    <FreqIndicator freq={freq} />
    <div >{letter}</div>
  </div>
}

function FreqIndicator({freq}) {
  const width = 14, height=42
  const freqR = Math.round(freq)
  const bars = []
  for (let i=0; i < freqR; i++) {
    bars.push(
      <line key={i} x1={0} x2={width} y1={i * 4} y2={i * 4}
        stroke="#00EB5F" strokeWidth={2} />
    )
  }
  return (
    <svg width={width} height={height}>
      <title>{freq.toFixed(2) + '%'}</title>
      <g transform={`translate(${width}, ${height}) rotate(-180)`}>{bars}</g>
    </svg>
  )
}