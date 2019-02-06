import React, { Component } from 'react';
import './App.css';

import CaesarCipherWidget from './components/CaesarWidget';
import CaesarBreakWidget from './components/CaesarBreakWidget'
import { caesarText } from './content/cipherTexts'
import { encipher } from './ciphers/caesar'

class App extends Component {
  render() {
    return (
      <div className="App">
        <CaesarCipherWidget
          title='Метод Цезаря: Шифрування'
          text='прочитав твою нову книжку'
        />
        <CaesarCipherWidget
          title='Метод Цезаря: Розшифрування'
          text='тусьйхгд хдсб рсдц нрйінц'
          reverse
        />
        <CaesarBreakWidget
          title='Метод Цезаря: Злом'
          text={encipher(19, caesarText.toLowerCase())}
        />
      </div>
    );
  }
}

export default App;
