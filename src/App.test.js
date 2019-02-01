import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';


import { encipher, decipher } from './ciphers/caesar'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});


test('ceasar encipher', () => {
  expect(encipher(3, 'абця')).toBe('гґщв');
});

test('ceasar encipher with 0 key', () => {
  expect(encipher(0, 'абця')).toBe('абця');
});

test('ceasar encipher with spaces', () => {
  expect(encipher(3, 'абця абця')).toBe('гґщв гґщв');
});

test('ceasar decipher', () =>
  expect(decipher(3, 'гґщв')).toBe('абця')
)