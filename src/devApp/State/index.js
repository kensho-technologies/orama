
import React, {PropTypes} from 'react'
import _ from 'lodash'

import {shouldPureComponentUpdate} from 'on-update'

export const State = React.createClass({
  getDefaultProps() {
    return {}
  },
  propTypes: {
    children: PropTypes.node,
    onUpdate: PropTypes.func,
    startWith: PropTypes.func,
  },
  getInitialState() {
    return {}
  },
  componentWillMount() {
    if (this.props.startWith) {
      this.props.startWith({
        ...this.props,
        ...this.state,
        onUpdate: this.props.onUpdate || this.handleChildUpdate,
        setState: this.handleChildUpdate,
      })
    }
  },
  shouldComponentUpdate: shouldPureComponentUpdate,
  childrenMap(child, key = 0) {
    return React.cloneElement(
      child,
      {
        ..._.omit(this.props, ['children', 'startWith']),
        ...this.state,
        onUpdate: this.props.onUpdate || this.handleChildUpdate,
        setState: this.handleChildUpdate,
        key,
      }
    )
  },
  handleChildUpdate(childProps) {
    this.setState(childProps)
  },
  render() {
    if (React.Children.count(this.props.children) === 0) return <span/>
    if (React.Children.count(this.props.children) > 1) {
      return (
        <div>
          {React.Children.map(this.props.children, this.childrenMap)}
        </div>
      )
    }
    return this.childrenMap(React.Children.only(this.props.children))
  },
})
