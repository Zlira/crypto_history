import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';


import { encipher, decipher } from './ciphers/caesar'
import { getIntermediateKeys } from './components/CaesarTextField'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

// -------------------------------------------------------
// tests for ceasar cipher
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


// -------------------------------------------------------
// tests for ceasar cipher
test('get intermediate keys with keys not chaning', () => {
  expect(getIntermediateKeys(1, 1)).toEqual([0, 1, 2])
})

test('get intermediate keys with sequenctial increasing keys', () => {
  expect(getIntermediateKeys(1, 2)).toEqual([0, 1, 2, 3])
})

test('get intermediate keys with increasing keys several values apart', () => {
  expect(getIntermediateKeys(1, 4)).toEqual([0, 1, 2, 3, 4, 5])
})

test('get intermediate keys with sequenctial decreasing keys', () => {
  expect(getIntermediateKeys(2, 1)).toEqual([0, 1, 2, 3])
})


test('get intermediate keys with decreasing keys several values apart', () => {
  expect(getIntermediateKeys(5, 1)).toEqual([0, 1, 2, 3, 4, 5, 6])
})

test('get intermediate kyes with decreasing keys out of range', () => {
  expect(getIntermediateKeys(1, -1)).toEqual([-2, -1, 0, 1, 2])
})

test('get intermediate kyes with decreasing keys out of range', () => {
  expect(getIntermediateKeys(32, 35)).toEqual([31, 32, 33, 34, 35, 36])
})