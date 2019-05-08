import React from 'react'


export default function SuccessIndicator({isSuccess}) {
  const isSuccessClass = isSuccess? ' cipher-widget__success-indicator_is-success' : ''
  return (
    <div style={{position: 'relative'}}>
      <div className={'cipher-widget__success-indicator' + isSuccessClass}></div>
    </div>
  )
}