import React from 'react'

import NavigationContainer from '../components/NavigationContainer/index'


export default function ChapterThree() {
  return <NavigationContainer linkBack='/2' level={3}>
    <article className='main-text'
      style={{
        fontSize: '4em',
        fontWeight: 'bold',
        color: 'grey',
        textAlign: 'center',
        marginTop: '130px',
      }}
    >
        Скоро буде…
    </article>
  </NavigationContainer>
}