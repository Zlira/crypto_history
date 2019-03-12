import React from 'react'


export class PairingSwitches extends React.PureComponent {
  render() {
    const {paired, handleClick} = this.props
    const switches = paired.map(
      (isPaired, i) => <div key={i} className="cipher-widget__pair-indicator-outer" onClick={() => handleClick(i)}>
       <div className={
         "cipher-widget__pair-indicator-inner " +
         (isPaired? "cipher-widget__pair-indicator-inner_active" : null )
       }></div>
      </div>
    )
    return <div> {switches} </div>
  }
}