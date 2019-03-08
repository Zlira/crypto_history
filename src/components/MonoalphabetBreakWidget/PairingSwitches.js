import React from 'react'


export function PairingSwitches({paired, handleClick}) {
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