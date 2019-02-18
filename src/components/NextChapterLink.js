import React from 'react'


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
    return <div className="next-chapter-link">
      <input type="text" placeholder="Введи ключове слово"
        value={this.state.userKeyword}
        onChange={this.handleInput}
        className="next-chapter-link__input"
      />
      <button onClick={this.handleClick} className="next-chapter-link__button">></button>
      { (this.state.touched && !this.keywordIsCorrect())
        ? <p>Не так! Щоб дізнатися правильне ключове слово, зламай шифр</p>
        : <p> </p>
      }
    </div>
  }
}