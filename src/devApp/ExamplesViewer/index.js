
import React, {PropTypes} from 'react'

import {ExampleLayout} from './ExampleLayout'
import {Page404} from '../Page404'

import * as examples from '../examples'

export const ExamplesViewer = props => {
  const exampleProps = examples[props.routerSubSection]
  const DataVis = examples[props.routerSubSection] && examples[props.routerSubSection].DataVis
  if (!DataVis) return <Page404/>
  return (
    <ExampleLayout {...props} {...exampleProps}>
      <DataVis {...props}/>
    </ExampleLayout>
  )
}
ExamplesViewer.propTypes = {
  routerSubSection: PropTypes.string,
}
