// Copyright 2018 Kensho Technologies, LLC.

import * as React from 'react'
import PropTypes from 'prop-types'
import {throttle} from 'lodash'

function wrapDisplayName(prefix, Component) {
  const displayName = Component.displayName || Component.name || 'Component'
  return `${prefix}(${displayName})`
}

// this HOC wraps `BaseComponent` and adds a width prop when it's not present
export default function withComputedWidth(BaseComponent) {
  return class WithComputedWidth extends React.Component {
    static displayName = wrapDisplayName('withComputedWidth', BaseComponent)

    static propTypes = {
      width: PropTypes.number,
    }

    divRef = React.createRef()

    state = {measuredWidth: null}

    componentDidMount() {
      window.addEventListener('resize', this.handleResize)
      this.updateWidth()
    }

    componentDidUpdate() {
      this.updateWidth()
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.handleResize)
    }

    handleResize = throttle(() => this.updateWidth(), 500)

    updateWidth() {
      if (this.divRef.current) {
        const measuredWidth = this.divRef.current.clientWidth
        this.setState(
          prevState => (prevState.measuredWidth === measuredWidth ? null : {measuredWidth})
        )
      }
    }

    render() {
      const {width} = this.props
      const {measuredWidth} = this.state
      const resolvedWidth = width != null ? width : measuredWidth
      return (
        <div ref={this.divRef}>
          {resolvedWidth != null && <BaseComponent {...this.props} width={resolvedWidth} />}
        </div>
      )
    }
  }
}
