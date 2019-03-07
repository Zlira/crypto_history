import React from 'react'

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import { monoAlphBreakText, Chapter2Text } from '../content/letterFrequency'
import { placeWithinRange } from '../ciphers/mathHelpers'

import './MonoalphabetBreakWidget.css'


// TODO add a reset button
const Hints = [
  {
    text: <p></p>,
    conditions: {},
  },
  {
    text: (<p>
      Почнемо із трьох найпоширеніших символів, у шифротексті це
      <span className="cipher-widget__text" > $</span>,
      <span className="cipher-widget__text" > %</span>,
      <span className="cipher-widget__text"> @</span>.
      Кожен з них займає приблизно 9% тексту, а наступний
      <span className="cipher-widget__text"> h</span> суттєво менш поширений (~6.5%).
      Аналогічну закономірність бачимо і в нижньому рядку, три найчастіші букви — голосні
      <span className="cipher-widget__text_plain"> А</span>,
      <span className="cipher-widget__text_plain"> О</span>,
      <span className="cipher-widget__text_plain"> И</span>.
      Поширення букв у тексті-зразку і шифротексті точно трохи відрізняється, але навряд чи настільки сильно,
      щоби якась з цих голосних опинилася на четвертому чи дальшому місці, тому зараз потрібно лише
      знайти відповідність між
      <span className="cipher-widget__text" > $</span>,
      <span className="cipher-widget__text" > %</span>,
      <span className="cipher-widget__text"> @ </span>
      з одного боку і
      <span className="cipher-widget__text_plain"> А</span>,
      <span className="cipher-widget__text_plain"> О</span>,
      <span className="cipher-widget__text_plain"> И </span>
      з іншого. На щастя, ми знаємо, що
      слова в українській мові не починаються з букви И.
      Також може стати в пригоді припущення, що драматичний вигук «О» у цьому тексті не дуже ймовірний,
      а от сполучник «а» — цілком.
    </p>
  ),
  conditions: {'$': 'и', '%': 'а', '@': 'о'}
  },
  {text: (<p>
    Просуваємося далі списком найпоширеніших символів, наступний на черзі
    <span className="cipher-widget__text"> h</span>.
    Розгадати, що це за буква допоможе слово
    <span className="cipher-widget__text"> hh</span>
    <span className="cipher-widget__text_plain">А</span>
    <span className="cipher-widget__text">w</span>
    <span className="cipher-widget__text_plain">А</span>
    <span className="cipher-widget__text">h^v </span>
    у передостанньому рядку.
    Серед букв зі схожою частотою у тексті-зразку (
    <span className="cipher-widget__text_plain">т</span>,
    <span className="cipher-widget__text_plain"> н</span>,
    <span className="cipher-widget__text_plain"> і</span>,
    <span className="cipher-widget__text_plain"> в</span>,
    <span className="cipher-widget__text_plain"> р</span>,
    <span className="cipher-widget__text_plain"> с</span>) тільки одна
    подвоюється на початку слова.
  </p>),
  conditions: {h: 'в'}
  },
  {text: (
    <p>
      Також ми маємо достатньо інформації, щоби відгадати символ
      <span className="cipher-widget__text"> j </span> (9-ий за поширенням).
      Він входить до складу таких слів з двох букв, як
      <span className="cipher-widget__text"> j</span><span className="cipher-widget__text_plain">И</span> і
      <span className="cipher-widget__text"> j</span><span className="cipher-widget__text_plain">А </span>
      , тому може бути приголосною
      <span className="cipher-widget__text_plain"> т</span>,
      <span className="cipher-widget__text_plain"> б</span>,
      <span className="cipher-widget__text_plain"> г</span> або
      <span className="cipher-widget__text_plain"> х</span>. Одна з них значно ймовірніша за інші.
    </p>),
  conditions: {j: 'т'}
  },
  {
    text: (<p>
      Тепер майже 40% шифротексту розгадано, тому ти можеш бачити довші слова, які
      нагадують щось людське, наприклад
      <span className="cipher-widget__text_plain"> ВИ</span>
      <span className="cipher-widget__text">k</span>
      <span className="cipher-widget__text_plain">О</span>
      <span className="cipher-widget__text">z</span>
      <span className="cipher-widget__text_plain">И</span>
      <span className="cipher-widget__text">^</span>
      <span className="cipher-widget__text_plain">ТОВ</span>
      <span className="cipher-widget__text">g</span>
      <span className="cipher-widget__text_plain">ВАТИ</span>
      . Можеш відгадати, що криється за
      символами
      <span className="cipher-widget__text"> k</span>,
      <span className="cipher-widget__text"> z</span>,
      <span className="cipher-widget__text"> ^</span>,
      <span className="cipher-widget__text"> g</span>?
    </p>),
    conditions: {k: 'к', z: 'р', '^': 'с', g: 'у'}
  },
  {
    text: (<p>
      Наступне майже розгадане слово
      <span className="cipher-widget__text_plain"> КРИ</span>
      <span className="cipher-widget__text">o</span>
      <span className="cipher-widget__text_plain">ТОА</span>
      <span className="cipher-widget__text">a</span>
      <span className="cipher-widget__text_plain">А</span>
      <span className="cipher-widget__text">in</span>
      <span className="cipher-widget__text_plain">ТИК</span>. Це ти зараз.
    </p>),
    conditions: {o: 'п', a: 'н', i: 'л', n: 'і'}
  },
  {
    text: (<p>
      Тепер уже зачіпок так багато, що очі розбігаються. Але, якщо не хочеш їх усі
      впольовувати, просто клацай далі, щоби побачити повний ключ.
    </p>)
  }
]


function getViolatedConditions(hintConditions, substDict) {
  const violated = {}
  for (let [key, val] of Object.entries(hintConditions)) {
    if (!(key in substDict) || (substDict[key] !== val)) {
      violated[key] = val
    }
  }
  return violated
}


function mergeHintCondsTill(hintIndex) {
  return Hints.slice(0, hintIndex + 1)
    .map(hint => hint.conditions)
    .reduce((acc, conds) => ({...acc, ...conds}), {})
}


export default class MonoalphabetBreakWidget extends React.Component {
  constructor(props) {
    super(props)

    const letterCount = Object.keys(monoAlphBreakText).length
    const refLetterFreq = []
    for (let i=0; i < Object.keys(Chapter2Text).length; i++) {
      refLetterFreq.push(Chapter2Text[i])
    }
    this.state = {
      pairings: Array(letterCount).fill(false),
      highlightedLetter: null,
      refLetterFreq: refLetterFreq,
      hintNum: 0,
      hintCondViolated: false,
    }

    this.toggleLettePairing = this.toggleLettePairing.bind(this)
    this.processText = this.processText.bind(this)
    this.setHighlighted = this.setHighlighted.bind(this)
    this.reorderRefFrequency = this.reorderRefFrequency.bind(this)
    this.showNextHint = this.showNextHint.bind(this)
    this.getSubstDict = this.getSubstDict.bind(this)
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

  showNextHint(increment) {
    const hintNum = placeWithinRange(this.state.hintNum + increment, 0, Hints.length - 1)
    if (hintNum - this.state.hintNum > 0) {
      const substDict = this.getSubstDict()
      const hintConidtions = mergeHintCondsTill(this.state.hintNum)
      const violated = getViolatedConditions(hintConidtions, substDict)
      if (Object.keys(violated).length) {
        return
      }
    }
    this.setState(prevState => {
      return {hintNum: placeWithinRange(prevState.hintNum + increment, 0, Hints.length - 1)}
    })
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
    return (
        <section className="cipher-widget cipher-widget_monoalphabet">
        <h3 className='cipher-widget__title'>Метод одноалфавітної заміни: Злом</h3>
        <div className='cipher-widget__body'>
          <HintContainer substDict={this.getSubstDict}/>
          <LetterFreques lettersInfo={monoAlphBreakText} handleHover={this.setHighlighted}/>
          <PairingSwitches paired={this.state.pairings} handleClick={this.toggleLettePairing} />
          <LetterFrequesDraggable lettersInfo={this.state.refLetterFreq}
            upsidedown isPlainText onDragEnd={this.reorderRefFrequency}
            lockedLetters ={this.state.pairings} />
          <p className="cipher-widget__secret-text cipher-widget__text ">
            {this.processText()}
          </p>
        </div>
        </section>
    )
  }
}


export function LetterFreques({lettersInfo, upsidedown, isPlainText, handleHover}) {
  const letters = []
  if (! handleHover) {
    handleHover = e => null
  }
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


function LetterFrequesDraggable({lettersInfo, upsidedown, isPlainText, onDragEnd, lockedLetters}) {
  const letters = []
  for (let i=0; i < Object.keys(lettersInfo).length; i++) {
    let letter = lettersInfo[i]
    let isLocked = lockedLetters[i]
    letters.push(
      <Draggable draggableId={letter.letter} index={i} key={letter.letter}
        isDragDisabled={isLocked}
      >
        {(provided) => <LetterFreq letter={letter.letter} freq={letter.freq}
            upsidedown={upsidedown} isPlainText={isPlainText} handleHover={() => null}
            isLocked={isLocked}
            innerRef={provided.innerRef}
            draggableProps={provided.draggableProps}
            dragHandleProps={provided.dragHandleProps} />}
      </Draggable>
    )
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="plain-text-container" direction="horizontal">
        {(provided) =>
          <div className="cipher-widget__letters-freq-cont"
           ref={provided.innerRef}
           {...provided.droppableProps}>
            {provided.placeholder}
            {letters}
          </div>
        }
      </Droppable>
    </DragDropContext>
  )
}


function LetterFreq({letter, freq, upsidedown, isPlainText, handleHover,
    isLocked, innerRef,
    draggableProps, dragHandleProps
}) {
  const freqInd = <FreqIndicator freq={freq} upsidedown={upsidedown} isPlainText={isPlainText} />
  const textClassName = "cipher-widget__text " + (isPlainText? 'cipher-widget__text_plain' : '')
  const containerClassName = "cipher-widget__letter-freq " + (isLocked? 'cipher-widget__letter-freq_locked' : '')
  return (
    <div className={containerClassName} ref={innerRef}
      {...draggableProps} {...dragHandleProps}
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


function Conditions(conditions) {
  return Object.entries(conditions).map(
    ([key, val], index) => <React.Fragment key={key}>
      <span className="cipher-widget__text">{key}</span> -> <span className="cipher-widget__text_plain">{val + ' '}</span>
    </React.Fragment>
  )

}


class HintContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      hintIndex: 0,
    }

    this.showNextHint = this.showNextHint.bind(this)
  }

  showNextHint(increment) {
    const hintIndex = placeWithinRange(
      this.state.hintIndex + increment, 0, Hints.length - 1
    )
    if (hintIndex - this.state.hintIndex > 0) {
      const substDict = this.props.substDict()
      const hintConidtions = mergeHintCondsTill(this.state.hintIndex)
      const violated = getViolatedConditions(hintConidtions, substDict)
      if (Object.keys(violated).length) {
        return
      }
    }
    this.setState({hintIndex: hintIndex})
  }

  render() {
    const violatedConditions = getViolatedConditions(
      mergeHintCondsTill(this.state.hintIndex),
      this.props.substDict
    )
    return (
    <div className="cipher-widget__text_hint">
      <div className='cipehr-widget__hint-controls'>
        <button onClick={e => this.showNextHint(-1)}>{'<'}</button>
        <button onClick={e => this.showNextHint(1)}>Мені потрібна підказка ></button>
        {Conditions(violatedConditions)}
      </div>
      {Hints[this.state.hintIndex].text}
    </div>
    )
    }
}
