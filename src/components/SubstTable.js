import React from 'react'


function textWithHighlight(text, index) {
  index = parseInt(index)
  return <>
    {text.slice(0, index)}
    <span className="cipher-widget__text_higlighted">{text[index]}</span>
    {text.slice(index + 1)}
  </>
}

export default function SubstTable({cipherAlphabet, openAlphabet, highlightIndex}) {
  if (highlightIndex) {
    openAlphabet = textWithHighlight(openAlphabet, highlightIndex)
    cipherAlphabet = textWithHighlight(cipherAlphabet, highlightIndex)
  }
  return (
    <table className='cipher-widget__subst-table'>
      <tbody>
        <tr>
          <td className="cipher-widget__subst-label ">відкритий текст: </td>
          <td className="cipher-widget__text cipher-widget__text_plain">
            {openAlphabet}
          </td>
        </tr>
        <tr>
          <td className="cipher-widget__subst-label">шифротекст: </td>
          <td className="cipher-widget__text cipher-widget__text_cipher">
            {cipherAlphabet}
          </td>
        </tr>
      </tbody>
    </table>
  )
}