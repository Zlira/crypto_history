import React from 'react'

import './NextChapterLink.css'


export default class NextChapterLink extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userKeyword: '',
      touched: false,
    }

    this.handleClick = this.handleClick.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.keywordIsCorrect = this.keywordIsCorrect.bind(this)
  }

  handleInput(e) {
    this.setState({
      userKeyword: e.target.value
    })
  }

  handleClick() {
    if (!this.state.touched) {
      this.setState({touched: true})
    }
    if (this.keywordIsCorrect()) {
      window.location = '/2'
    }
  }

  keywordIsCorrect() {
    return this.state.userKeyword.trim().toLowerCase() === this.props.keyword
  }

  render () {
    return <div className="next-chapter-link command">
      <p className="command__phrase next-chapter-link__label">Щоби перейти далі введи слово-ключ: </p>
      <div className="next-chapter-link__controls">
        <input type="text" placeholder="Ключове слово"
          value={this.state.userKeyword}
          onChange={this.handleInput}
          className="next-chapter-link__input"
        />
        <button onClick={this.handleClick} className="next-chapter-link__button">></button>
      </div>
      { (this.state.touched && !this.keywordIsCorrect())
        ? <p className="next-chapter-link__label next-chapter-link__label_wrong">Нi! Правильне слово у тексті вище.</p>
        : null
      }
    </div>
  }
}