
import React from 'react'
import shouldPureComponentUpdate from 'react-pure-render/function'

const pureHOC = (Child) => React.createClass({
  displayName: Child.name,
  propTypes: Child.propTypes,
  getDefaultProps() {
    return Child.defaultProps
  },
  shouldComponentUpdate: shouldPureComponentUpdate,
  render() {
    return Child(this.props)
  },
})

export default pureHOC
