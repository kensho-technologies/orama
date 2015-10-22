
import React from 'react'
import shouldPureComponentUpdate from 'react-pure-render/function'

const pureHOC = (Child) => React.createClass({
  displayName: `${Child.name}(Pure)`,
  shouldComponentUpdate: shouldPureComponentUpdate,
  render() {
    return Child(this.props)
  },
})

export default pureHOC
