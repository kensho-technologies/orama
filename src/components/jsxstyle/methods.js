import React, {PropTypes} from 'react'
import R from 'ramda'

import * as prefixers from './prefixers'

export const autoprefix = R.pipe(...R.values(prefixers))

export function makeStyleComponentClass(display, displayName) {
  return React.createClass({
    displayName: displayName,
    propTypes: {
      children: PropTypes.element,
    },
    render() {
      const style = autoprefix({
        ...this.props,
        display,
        children: undefined,
      })
      return <div style={style}>{this.props.children}</div>
    },
  })
}
