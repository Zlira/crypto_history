import React from 'react'

import { monoAlphBreakText, Chapter2Text } from '../../content/letterFrequency'
import { LetterFreques, LetterFrequesDraggable } from './LetterFrequencies'
import { PairingSwitches } from './PairingSwitches'
import { putIntoStorage, getFromStorage} from '../../LocalStorage'
import HintContainer from './Hints'

import './MonoalphabetBreakWidget.css'

const PAIRS_KEY = 'monoalphabetPairs'
const REF_ORDER_KEY = 'monoalphabetRefOrder'


export default class MonoalphabetBreakWidget extends React.Component {
  constructor(props) {
    super(props)

    this.getInitState = this.getInitState.bind(this)
    this.state = this.getInitState()

    this.reset = this.reset.bind(this)
    this.toggleLettePairing = this.toggleLettePairing.bind(this)
    this.processText = this.processText.bind(this)
    this.setHighlighted = this.setHighlighted.bind(this)
    this.reorderRefFrequency = this.reorderRefFrequency.bind(this)
    this.getSubstDict = this.getSubstDict.bind(this)
    this.setSelectedLetter = this.setSelectedLetter.bind(this)
  }

  getInitState() {
    const letterCount = Object.keys(monoAlphBreakText).length
    const pairings = getFromStorage(PAIRS_KEY) || Array(letterCount).fill(false)
    const refLetterFreq = getFromStorage(REF_ORDER_KEY) || []
    if (refLetterFreq.length === 0) {
      for (let i=0; i < Object.keys(Chapter2Text).length; i++) {
        refLetterFreq.push(Chapter2Text[i])
      }
    }
    return {
      pairings: pairings,
      highlightedLetter: null,
      refLetterFreq: refLetterFreq,
      selectedRefLetter: '',
      selectedTextLetter: '',
    }
  }

  reset() {
    putIntoStorage(PAIRS_KEY, null)
    putIntoStorage(REF_ORDER_KEY, null)
    this.setState(this.getInitState())
  }

  setSelectedLetter(letter, letterType) {
    this.setState({
      [letterType]: letter,
    })
  }

  toggleLettePairing(index) {
    const newPairings = this.state.pairings.map(
      (isPaired, i) => i === index? !isPaired : isPaired
    )
    putIntoStorage(PAIRS_KEY, newPairings)
    this.setState({
      pairings: newPairings
    })
  }

  setHighlighted(letter) {
    this.setState({
      highlightedLetter: letter
    })
  }

  reorderRefFrequency(result) {
    const { destination, source } = result
    if (!destination) {return}
    if (destination.index === source.index) {return}
    const movingLetters = {}
    const fixedLetters = {}
    const movedLetter = this.state.refLetterFreq[source.index]
    for (let i=0; i < this.state.refLetterFreq.length; i++) {
      if (this.state.pairings[i]) {
        fixedLetters[i] = this.state.refLetterFreq[i]
      } else {
        if (
          !this.state.refLetterFreq[i] ||
          this.state.refLetterFreq[i].letter !== movedLetter.letter
        ) {
          movingLetters[i] = this.state.refLetterFreq[i]
        }
      }
    }
    let destIndext = destination.index
    while (destIndext in fixedLetters) {
      destIndext--
    }
    if (destIndext < 0) {
      destIndext = destination.index
      while (destIndext in fixedLetters) {
        destIndext++
      }
    }
    fixedLetters[destIndext] = movedLetter
    const moveLettersList = Object
      .entries(movingLetters)
      .sort((first, second) => second[0] - first[0])
      .map(el => el[1])
    const newRefLetterFreq = []
    for (let i=0; i < this.state.refLetterFreq.length; i++) {
      if (i in fixedLetters) {
        newRefLetterFreq.push(fixedLetters[i])
      } else {
        newRefLetterFreq.push(moveLettersList.pop())
      }
    }
    putIntoStorage(REF_ORDER_KEY, newRefLetterFreq)
    this.setState({
      refLetterFreq: newRefLetterFreq,
    })
  }

  getSubstDict() {
    const keyIndexes = this.state.pairings.map(
      (e, i) => e? i : null
    ).filter(e => e || e === 0)
    const substDict = {}
    for (let key of keyIndexes) {
      substDict[monoAlphBreakText[key].letter] = this.state.refLetterFreq[key].letter
    }
    return substDict
  }

  processText() {
    const substDict = this.getSubstDict()
    const getClass = l => l === this.state.highlightedLetter? 'cipher-widget__text_higlighted ' : ''
    const letters = this.props.text.split('').map(
      (l, i) => substDict[l]
        ? <span className={getClass(l) + "cipher-widget__text_plain"}  key={i}>{substDict[l]}</span>
        : <span className={getClass(l)} key={i}>{l}</span>
    )
    return letters
  }

  render() {
    const substDict = this.getSubstDict()
    return (
        <section className="cipher-widget cipher-widget_monoalphabet">
        <h3 className='cipher-widget__title'>Метод одноалфавітної заміни: Злом</h3>
        <div className='cipher-widget__body'>
          <HintContainer substDict={substDict}/>
          <div style={{position: 'relative'}}>
            <OneLetterInput letter={this.state.selectedTextLetter}
              title={'Виділити букву шифротексту'}
              letterSetter={l => this.setSelectedLetter(l, 'selectedTextLetter')}
              bottom />
            <LetterFreques lettersInfo={monoAlphBreakText} handleHover={this.setHighlighted}
              selectedLetter={this.state.selectedTextLetter} />
          </div>
          <PairingSwitches paired={this.state.pairings} handleClick={this.toggleLettePairing}
            reset={this.reset} />
          <div style={{position: 'relative'}}>
            <OneLetterInput letter={this.state.selectedRefLetter}
              title={'Виділити букву тексту-зразка'}
              letterSetter={l => this.setSelectedLetter(l, 'selectedRefLetter')}/>
            <LetterFrequesDraggable lettersInfo={this.state.refLetterFreq}
              upsidedown isPlainText onDragEnd={this.reorderRefFrequency}
              lockedLetters ={this.state.pairings}
              selectedLetter={this.state.selectedRefLetter}/>
          </div>
          <CipherText text={this.props.text} substDict={substDict}
            highlightedLetter={this.state.highlightedLetter} />
        </div>
        </section>
    )
  }
}


function processText(text, substDict, highlightedLetter) {
  const getClass = l =>
    (l === highlightedLetter? 'cipher-widget__text_higlighted ' : '') +
    (substDict[l]? 'cipher-widget__text_plain ' : '')
  let currLetter, currClass, prevClass, spans = [], currSpanText = ''
  for (let i = 0; i < text.length; i++) {
    currLetter = text[i]
    prevClass = currClass
    currClass = getClass(currLetter)
    if (prevClass === currClass) {
      currSpanText = currSpanText + (substDict[currLetter] || currLetter)
    } else {
      spans.push(<span className={prevClass} key={i}>{currSpanText}</span>)
      currSpanText = (substDict[currLetter] || currLetter)
    }
  }
  spans.push(<span className={currClass} key={text.length}>{currSpanText}</span>)
  return spans
}


function CipherText({text, substDict, highlightedLetter}) {
  return (
    <p className="cipher-widget__secret-text cipher-widget__text ">
      {processText(text, substDict, highlightedLetter)}
    </p>
  )
}


class OneLetterInput extends React.PureComponent {
  constructor(props) {
    super(props)
    this.handleInput = this.handleInput.bind(this)
  }

  handleInput(e) {
    const value = e.target.value
    let result = ''
    if (value.length) {
      result = value[value.length - 1].toLowerCase()
    }
    this.props.letterSetter(result)
  }

  render() {
    const isEmpty = !this.props.letter.length
    const className = 'cipher-widget__letter-selector '
      + (isEmpty? 'cipher-widget__letter-selector_empty ' : '')
      + (this.props.bottom? 'cipher-widget__letter-selector_bottom' : '')
    return (
      <input className={className}
        title={this.props.title}
        type="text" value={this.props.letter} onChange={this.handleInput} />
    )
  }
}