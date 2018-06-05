// Copyright 2018 Kensho Technologies, LLC.

import PropTypes from 'prop-types'
import * as React from 'react'

import wrapDisplayName from './wrapDisplayName'

export default function withControlledState(BaseComponent, getInitialState) {
  return class WithControlledState extends React.PureComponent {
    static displayName = wrapDisplayName('withControlledState', BaseComponent)

    static propTypes = {
      onUpdate: PropTypes.func,
    }

    state = getInitialState ? getInitialState() : {}

    handleChildUpdate = childProps => {
      this.setState(childProps)
    }

    render() {
      return (
        <BaseComponent
          {...this.props}
          {...this.state}
          onState={this.handleChildUpdate}
          onUpdate={this.props.onUpdate || this.handleChildUpdate}
        />
      )
    }
  }
}
