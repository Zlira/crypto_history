import React from 'react'

import { encipher } from '../ciphers/monoalphabet'

import katerineDialogImg from '../img/katherine_ferdinand.png'
import './KaterineDialog.css'


export default function KaterineDialog() {
  return <div className="kats-dialog">
    <div className="kats-dialog__msg kats-dialog__msg_kat">
      {encipher('Тату! Я хвилююся, що деякі леді тут залицяються до мого чоловіка.')}
    </div>
    <div className="kats-dialog__msg kats-dialog__msg_ferdi">
      {encipher('Нічого дивного, доню, жінки постійно втачають голови через нас, королів.')}
    </div>
    <img src={katerineDialogImg} draggable={false} alt="розмова Катерини з батьком"/>
  </div>
}