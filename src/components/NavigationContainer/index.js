import React from 'react'
import { withRouter } from 'react-router'

import {LevelsContext} from '../../LevelsContex'
import Modal from './Modal'
import './NavContainer.css'


class NavigationContrainer extends React.Component {
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
    this.props.history.push(this.props.linkForward)
  }

  render() {
    const {children, linkForward, linkBack, history} = this.props
    return <div>
      {linkForward
        ? <div className='nav__link nav__link_right' title="вперед" onClick={this.handleForward}></div>
        : <NavLinkEmpty/>
      }
      {linkBack
        ? <div className='nav__link nav__link_left' title="назад"
            onClick={() => history.push(linkBack)}></div>
        : <NavLinkEmpty/>
      }
      {children}
      {this.state.modalShown
        ? <Modal handleStay={this.hideModal} handleLeave={this.goForward} />
        : null}
    </div>
  }
}

function NavLinkEmpty({side}) {
  return <div className={"nav__link nav__link_empty nav__link_" + side}></div>
}

export default withRouter(NavigationContrainer)