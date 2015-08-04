/* @flow */

import React, { PropTypes } from 'react'

/**
 * This function adds two numbers...
 */
export function add(n1: number, n2: number): number {
  return n1 + n2
}

/**
 * General component description.
 */
export default React.createClass({
  displayName: 'App',
  propTypes: {
    children: PropTypes.func,
  },
  render(): any {
    return (
      <div>
        The result was: {add(1, 2)}
      </div>
    )
  },
})
