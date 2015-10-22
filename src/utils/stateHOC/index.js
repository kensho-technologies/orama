
import React from 'react'

const stateHOC = (Child) => React.createClass({
  displayName: `${Child.name}(state)`,
  propTypes: Child.propTypes,
  getDefaultProps() {
    return Child.defaultProps
  },
  handleChildUpdate(childProps) {
    this.setState(childProps)
  },
  render() {
    return Child({
      ...this.props,
      ...this.state,
      onUpdate: this.handleChildUpdate,
    })
  },
})

export default stateHOC
