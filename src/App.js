import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom'
import './App.css';

import ChapterOne from './content/ChapterOne'
import ChapterTwo from './content/ChapterTwo'


class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={ChapterOne}/>
          <Route path="/2" component={ChapterTwo}/>
        </Switch>
      </div>
    );
  }
}

export default App;
