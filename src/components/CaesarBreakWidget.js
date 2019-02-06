import React from 'react'

import {CaesarBreakKeyControls} from './CaesarKeyControls'


export default class CaesarBreakWidget extends React.Component {
  render() {
    return (
      <section className='cipher-widget cipher-widget_break'>
        <h3 className='cipher-widget__title'>{this.props.title}</h3>
        <CeasarBreakBody />
      </section>
    )
  }
}


function CeasarBreakBody() {
  return <div>
    <CaesarBreakKeyControls cipherKey={0} updateCipherKey={e => console.log(e.target.value)}/>
  </div>

}