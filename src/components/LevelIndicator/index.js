import React from 'react'

import {LevelsContext} from '../../LevelsContex'
import keyImg from '../../img/icons/key.svg'
import inactiveKeyImg from '../../img/icons/key_inactive.svg'
import './LevelIndicator.css'


export default class LevelIndicator extends React.Component {
  static contextType = LevelsContext
  constructor(props) {
    super(props)

    this.resetLevels = this.resetLevels.bind(this)
  }

  resetLevels() {
    this.context.clearPassedLevels()
  }

  render() {
    const levels = this.context.levelsPassed.map(
      (l, i) => <LevelIcon key={i} index={i + 1} active={l}/>
    )
    return <div className='level-indicator'>
      <p className='level-indicator__reset-btn'
        title='скинути пройдені рівні'
        onClick={this.resetLevels}>+</p>
      {levels}
    </div>
  }
}


function LevelIcon({active, index}) {
  // todo add title and more detialed alt
  let src, desc = `рівень №${index}: `
  if (active) {
    src = keyImg
    desc = desc + 'завершений'
  } else {
    src = inactiveKeyImg
    desc = desc + 'непройдений'
  }
  return <img src={src} alt={desc} title={desc} className='level-indicator__icon'/>
}