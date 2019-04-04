import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import './App.css';

import ChapterOne from './content/ChapterOne'
import ChapterTwo from './content/ChapterTwo'
import ChapterThree from './content/ChapterThree'


class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={ChapterOne}/>
          <Route path="/2" component={ChapterTwo}/>
          <Route path="/3" component={ChapterThree}/>
        </Switch>
      </div>
    );
  }
}

export default App;
