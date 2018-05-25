// Copyright 2018 Kensho Technologies, LLC.

import * as React from 'react'
import PropTypes from 'prop-types'
import {isFunction, isPlainObject, omit} from 'lodash'

export default class stateHOC extends React.PureComponent {
  static defaultProps = {}

  static propTypes = {
    children: PropTypes.node,
    onUpdate: PropTypes.func,
    startWith: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }

  state = {}

  componentWillMount() {
    if (this.props.startWith && isFunction(this.props.startWith)) {
      this.props.startWith({
        onUpdate: this.props.onUpdate || this.handleChildUpdate,
        ...omit(this.props, ['children', 'startWith']),
        ...this.state,
        setState: this.handleChildUpdate,
      })
    } else if (this.props.startWith && isPlainObject(this.props.startWith)) {
      this.setState(this.props.startWith)
    }
  }

  childrenMap = (child, key = 0) =>
    React.cloneElement(child, {
      onUpdate: this.handleChildUpdate,
      ...omit(this.props, ['children', 'startWith']),
      ...this.state,
      setState: this.handleChildUpdate,
      key,
    })

  handleChildUpdate = childProps => {
    this.setState(childProps)
  }

  render() {
    if (React.Children.count(this.props.children) === 0) return <span />
    if (React.Children.count(this.props.children) > 1) {
      return <div>{React.Children.map(this.props.children, this.childrenMap)}</div>
    }
    return this.childrenMap(React.Children.only(this.props.children))
  }
}
