import React from 'react'

import './Modal.css'


export default class Modal extends React.Component {
  constructor(props) {
    super(props)

    this.contentRef = React.createRef()
    this.handleClickOutside = this.handleClickOutside.bind(this)
  }

  handleClickOutside(event) {
    try {
      if (!this.contentRef.current.contains(event.target)) {
      this.props.handleStay()
      }
    } catch { }
  }

  componentDidMount() {
    document.addEventListener(
      'click', this.handleClickOutside
    )
  }

  componentWillUnmount() {
    document.removeEventListener(
      'click', this.handleClickOutside
    )
  }

  render() {
    const {handleStay, handleLeave} = this.props
    return <div className='modal__background'>
     <div className='modal__content' ref={this.contentRef}>
      <p className='modal__text-explanation'>
        Ти хочеш перейти до наступної частини не зламавши шифру
        у кінці цього розділу. Це нічого,
        але ще крутіше було би <em>здобути рівень</em>.
        Для цього зламай шифр, знайди секретне слово-ключ
        і введи його у поле внизу сторінки.
      </p>
      <button className='modal__btn modal__btn_stay' onClick={handleStay}>
        Залишитися і здобути
      </button>
      <button className='modal__btn modal__btn_go' onClick={handleLeave}>
        Перейти далі
      </button>
     </div>
    </div>
  }
}