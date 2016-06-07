
import React, {PropTypes} from 'react'
import _ from 'lodash'

import {shouldPureComponentUpdate} from 'on-update'
import createHistory from 'history/lib/createBrowserHistory'

export const Router = React.createClass({
  getDefaultProps() {
    return {
      onUpdate: () => undefined,
      setState: () => undefined,
    }
  },
  propTypes: {
    children: PropTypes.node,
    onUpdate: PropTypes.func,
    setState: PropTypes.func,
  },
  getInitialState() {
    return {}
  },
  componentDidMount() {
    this.history = createHistory()
    this.history.listen(loc => this.handleHistoryUpdate(loc))
  },
  shouldComponentUpdate: shouldPureComponentUpdate,
  childrenMap(child, key = 0) {
    return React.cloneElement(
      child,
      {
        ..._.omit(this.props, 'children'),
        ...this.state,
        onUpdate: this.handleChildUpdate,
        setState: this.handleChildState,
        key,
      }
    )
  },
  handleHistoryUpdate(location) {
    const paths = _.compact(location.pathname.split('/'))
    this.props.onUpdate({
      routerSection: paths[0],
      routerSubSection: paths[1],
      routerSubSubSection: paths[2],
    })
  },
  handleRoute(childProps) {
    if (childProps.routerPath) {
      this.history.push(childProps.routerPath)
    }
  },
  handleChildState(childProps) {
    this.handleRoute(childProps)
    this.props.setState(childProps)
  },
  handleChildUpdate(childProps) {
    this.handleRoute(childProps)
    this.props.onUpdate(childProps)
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
