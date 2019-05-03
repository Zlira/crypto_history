import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import './App.css';

import { LevelsContext } from './LevelsContex'
import { getFromStorage, putIntoStorage } from './LocalStorage'
import LevelIndicator from './components/LevelIndicator/index'
import ChapterOne from './content/ChapterOne'
import ChapterTwo from './content/ChapterTwo'
import ChapterThree from './content/ChapterThree'


class App extends Component {
  constructor(props) {
    super(props)
    const initLevelsPassed = getFromStorage('levelsPassed') || [false, false, false]
    console.log(initLevelsPassed)
    this.state = {
      levelsPassed: initLevelsPassed,
    }
    this.addPassedLevel = this.addPassedLevel.bind(this)
    this.updatedPassedLevels = this.updatedPassedLevels.bind(this)
    this.clearPassedLevels = this.clearPassedLevels.bind(this)
  }

  updatedPassedLevels(levels) {
    this.setState({
      levelsPassed: levels
    }, () => {
      putIntoStorage('levelsPassed', this.state.levelsPassed)
    })
  }

  clearPassedLevels() {
    const levels = [...this.state.levelsPassed.map(l => false)]
    this.updatedPassedLevels(levels)
  }

  addPassedLevel(level) {
    const levels = [...this.state.levelsPassed.map(
      (el, i) => i === level - 1? true : el
    )]
    this.updatedPassedLevels(levels)
  }

  render() {
    return (
      <LevelsContext.Provider value={{
        levelsPassed: this.state.levelsPassed,
        addPassedLevel: this.addPassedLevel,
        clearPassedLevels: this.clearPassedLevels,
       }}>
        <div className="App">
          <LevelIndicator/>
          <Switch>
            <Route exact path="/" component={ChapterOne}/>
            <Route path="/2" component={ChapterTwo}/>
            <Route path="/3" component={ChapterThree}/>
          </Switch>
        </div>
      </LevelsContext.Provider>
    );
  }
}

export default App;
