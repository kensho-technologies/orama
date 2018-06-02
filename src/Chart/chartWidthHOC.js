// Copyright 2018 Kensho Technologies, LLC.

import * as React from 'react'
import PropTypes from 'prop-types'
import {throttle} from 'lodash'

// this component wraps <BaseComponent /> and adds a width prop when it's not present
export default function chartWidthHOC(BaseComponent) {
  return class ChartWidthHOC extends React.Component {
    static propTypes = {
      width: PropTypes.number,
    }

    static displayName = 'ChartWidthHOC'

    divRef = React.createRef()

    state = {}

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
      if (this.divRef.current && !this.props.width) {
        const width = this.divRef.current.clientWidth
        this.setState(prevState => (prevState.width === width ? null : {width}))
      }
    }

    render() {
      return (
        <div ref={this.divRef}>
          <BaseComponent {...this.state} {...this.props} />
        </div>
      )
    }
  }
}
