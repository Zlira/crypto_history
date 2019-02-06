import React, { Component } from 'react';
import './App.css';

import CipherWidget from './components/CipherWidget';
import CaesarBreakWidget from './components/CaesarBreakWidget'

class App extends Component {
  render() {
    return (
      <div className="App">
        <CipherWidget
          title='Метод Цезаря: Шифрування'
          text='прочитав твою нову книжку'
        />
        <CipherWidget
          title='Метод Цезаря: Розшифрування'
          text='тусьйхгд хдсб рсдц нрйінц'
          reverse
        />
        <CaesarBreakWidget
          title='Метод Цезаря: Злом'
        />
      </div>
    );
  }
}

export default App;
