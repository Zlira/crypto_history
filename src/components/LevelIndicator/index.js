import React from 'react'

import {LevelsContext} from '../../LevelsContex'
import './LevelIndicator.css'


export default class LevelIndicator extends React.Component {
  static contextType = LevelsContext

  render() {
    return <div className='level-indicator'>
      {this.context.levelsPassed.map(e => e.toString()).join()}
    </div>
  }
}