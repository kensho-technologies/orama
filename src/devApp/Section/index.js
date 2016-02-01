
import React, {PropTypes} from 'react'

import {Posts} from '../Section/Posts'
import {Post} from '../Post'

export const Section = props => {
  switch (props.routerSection) {
    case 'posts':
      return <Posts {...props}/>
    case 'post':
      return <Post {...props}/>
    default:
      return <Posts {...props}/>
  }
}
Section.propTypes = {
  routerSection: PropTypes.string,
}

export const sectionsData = [
  {
    name: 'Examples',
    id: 'posts',
    showOnMenu: true,
  },
]
