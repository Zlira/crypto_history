import React from 'react'

import './NavContainer.css'


export default function NavigationContrainer({children, linkForward, linkBack}) {
  return <div>
    {
      linkForward? <div className='nav__link nav__link_right' onClick={() => window.location = linkForward}></div> : null
    }
    {
      linkBack? <div className='nav__link nav__link_left' onClick={() => window.location = linkBack}></div> : null
    }
    {children}
  </div>
}