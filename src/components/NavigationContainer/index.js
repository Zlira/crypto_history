import React from 'react'

import {LevelsContext} from '../../LevelsContex'
import Modal from './Modal'
import './NavContainer.css'


export default class NavigationContrainer extends React.Component {
  static contextType = LevelsContext

  constructor(props) {
    super(props)
    this.state = {
      modalShown: false
    }

    this.goForward = this.goForward.bind(this)
    this.handleForward = this.handleForward.bind(this)
    this.showModal = this.showModal.bind(this)
    this.hideModal = this.hideModal.bind(this)
  }

  showModal() {
    this.setState({modalShown: true})
  }

  hideModal() {
    this.setState({modalShown: false})
  }

  handleForward() {
    if (!this.context.levelsPassed[this.props.level - 1]) {
      this.showModal()
    } else {
      this.goForward()
    }
  }

  goForward() {
    window.location = this.props.linkForward
  }

  render() {
    const {children, linkForward, linkBack} = this.props
    return <div>
      {linkForward
        ? <div className='nav__link nav__link_right' onClick={this.handleForward}></div>
        : null
      }
      {linkBack
        ? <div className='nav__link nav__link_left'
            onClick={() => window.location = linkBack}></div>
        : null
      }
      {children}
      {this.state.modalShown
        ? <Modal handleStay={this.hideModal} handleLeave={this.goForward} />
        : null}
    </div>
  }
}