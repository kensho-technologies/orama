import React, {PropTypes} from 'react'
import R from 'ramda'

import shouldPureComponentUpdate from 'react-pure-render/function'
import * as prefixers from './prefixers'

/**
 * Creates function for pipeing a style through all local prefixers
 * @param  {object} style
 * @return {object}          prefixed style object
 */
export const autoprefix = R.pipe(...R.values(prefixers))

/**
 * Returns a React component that converts props into autoprefixed style, with a specific display value
 * @param  {string} display     css display value
 * @param  {string} displayName component displayName value
 * @return {ReactComponent}
 */
export function makeStyleComponentClass(display, displayName) {
  return React.createClass({
    displayName: displayName,
    propTypes: {
      children: PropTypes.node,
      id: PropTypes.string,
    },
    shouldComponentUpdate: shouldPureComponentUpdate,
    render() {
      const style = autoprefix({
        ...this.props,
        display,
        id: undefined,
        children: undefined,
      })
      return (
        <div
          id={this.props.id}
          style={style}
        >{this.props.children}</div>
      )
    },
  })
}
