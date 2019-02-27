import React from 'react'


export default function MonoalphabetBreakWidget({text}) {
  return (
    <section className="cipher-widget cipher-widget_monoalphabet">
      <h3 className='cipher-widget__title'>Метод одноалфавітної заміни: Злом</h3>
      <div className='cipher-widget__body'>
        <p className="cipher-widget__secret-text cipher-widget__text ">
          {text}
        </p>
      </div>
    </section>
  )
}