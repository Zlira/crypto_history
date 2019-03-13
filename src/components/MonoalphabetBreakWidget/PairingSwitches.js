import React from 'react'


export class PairingSwitches extends React.PureComponent {
  render() {
    const {paired, handleClick, reset} = this.props
    const switches = paired.map(
      (isPaired, i) => <PairingSwitch key={i} handleClick={e => handleClick(i)} isPaired={isPaired}/>
    )
    return <div style={{position: 'relative'}}>
      {switches}
      <div className="cipher-widget__pair-reset" title="скинути" onClick={reset}>×</div>
    </div>
  }
}


function PairingSwitch({handleClick, isPaired}) {
  return (
    <div className="cipher-widget__pair-indicator-outer" onClick={handleClick}>
      <div className={
        "cipher-widget__pair-indicator-inner " +
        (isPaired? "cipher-widget__pair-indicator-inner_active" : null )}></div>
    </div>
  )
}