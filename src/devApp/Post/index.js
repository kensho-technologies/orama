
import React, {PropTypes} from 'react'
import _ from 'lodash'

import {Page404} from '../Page404'

import * as postComponents from './list'

export const Post = props => {
  const Component = postComponents[props.routerSubSection] && postComponents[props.routerSubSection][props.routerSubSection]
  if (!Component) return <Page404/>
  return <Component {...props}/>
}
Post.propTypes = {
  routerSubSection: PropTypes.string,
}

export const postsData = _.map(
  postComponents,
  (value, key) => ({
    title: key,
    id: key,
  })
)

// export const postsData = [
//   {
//     title: 'Line chart examples',
//     description: 'Multi lines, and hoverstroke mapping',
//     id: 'examples',
//   },
//   {
//     title: 'Brush examples',
//     description: 'Brush timelines',
//     id: 'brush-examples',
//   },
//   {
//     title: 'Dimension Swapper',
//     description: 'Change the displayed dimensions on a scatterplot',
//     id: 'dim-swapper',
//   },
//   {
//     title: 'Old Examples',
//     description: 'A bit of everything',
//     id: 'old-examples',
//   },
// ]
