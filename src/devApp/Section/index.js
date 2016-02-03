
import React, {PropTypes} from 'react'

import {ExamplesSection} from '../ExamplesSection'
import {ExamplesViewer} from '../ExamplesViewer'

export const Section = props => {
  switch (props.routerSection) {
    case 'examples':
      return <ExamplesSection {...props}/>
    case 'example':
      return <ExamplesViewer {...props}/>
    default:
      return <ExamplesSection {...props}/>
  }
}
Section.propTypes = {
  routerSection: PropTypes.string,
}

export const sectionsData = [
  {
    name: 'Examples',
    id: 'examples',
    showOnMenu: true,
  },
]
