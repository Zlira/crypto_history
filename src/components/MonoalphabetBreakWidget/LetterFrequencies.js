import React from 'react'

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'


export class LetterFreques extends React.PureComponent {
  render () {
    let {lettersInfo, upsidedown, isPlainText, handleHover, selectedLetter} = this.props
    const letters = []
    if (! handleHover) {
      handleHover = e => null
    }
    for (let i=0; i < Object.keys(lettersInfo).length; i++) {
      let letter = lettersInfo[i]
      letters.push(
        <LetterFreq letter={letter.letter} freq={letter.freq}
          upsidedown={upsidedown} isPlainText={isPlainText} handleHover={handleHover}
          key={letter.letter} isSelected={letter.letter === selectedLetter}/>
      )
    }
    return <div className="cipher-widget__letters-freq-cont">{letters}</div>
  }
}


export class LetterFrequesDraggable extends React.PureComponent {
  render() {
    const {lettersInfo, upsidedown, isPlainText, onDragEnd,
      lockedLetters, selectedLetter} = this.props
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
              isSelected={letter.letter === selectedLetter}
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
}


function LetterFreq({letter, freq, upsidedown, isPlainText, handleHover,
    isLocked, innerRef,
    draggableProps, dragHandleProps, isSelected,
}) {
  const freqInd = <FreqIndicator freq={freq} upsidedown={upsidedown} isPlainText={isPlainText} />
  const textClassName = "cipher-widget__text "
    + (isPlainText? 'cipher-widget__text_plain' : '')
  const containerClassName = "cipher-widget__letter-freq "
    + (isLocked? 'cipher-widget__letter-freq_locked ' : '')
    + (isSelected? 'cipher-widget__letter-freq_selected ' : '')
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

class FreqIndicator extends React.Component {
  shouldComponentUpdate(nextProps) {
    // other props aren't changing during component life cycle
    return nextProps.freq !== this.props.freq
  }

  render() {
    const {freq, upsidedown, isPlainText} = this.props
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
}