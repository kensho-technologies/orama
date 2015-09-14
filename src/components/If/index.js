
import React, {PropTypes} from 'react'

export default React.createClass({
  displayName: 'If',
  propTypes: {
    children: PropTypes.element,
    condition: PropTypes.any,
  },
  getDefaultProps() {
    return {
    }
  },
  render() {
    if (!this.props.condition) return null
    return (
      <div>
        {this.props.children}
      </div>
    )
  },
})
