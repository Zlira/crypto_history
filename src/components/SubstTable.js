import React from 'react'


export default function SubstTable({cipherAlphabet, openAlphabet}) {
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
          <td className="cipher-widget__text cipher-widget__text_cipher">{cipherAlphabet}</td>
        </tr>
      </tbody>
    </table>
  )
}