// Copyright 2017 Kensho Technologies, Inc.

import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

/*
This component wrapps up the <InputComponent/> and add a width prop when it's not present
*/
export const chartWidthHOC = InputComponent =>
  class ChartWidthHOC extends React.Component {
    static propTypes = {
      width: PropTypes.number,
    }
    state = {}
    componentWillReceiveProps = () => {
      this.updateWidth()
    }
    componentWillMount = () => {
      this.handleResize = _.throttle(this.updateWidth, 500)
    }
    componentDidMount = () => {
      window.addEventListener('resize', this.handleResize)
      this.updateWidth()
    }
    componentWillUnmount = () => {
      window.removeEventListener('resize', this.handleResize)
    }
    updateWidth = () => {
      if (this.divNode && !this.props.width) {
        const width = this.divNode.clientWidth
        if (this.state.width !== width) {
          this.setState({width})
        }
      }
    }
    handleRef = (divNode) => {
      this.divNode = divNode
    }
    render() {
      return (
        <div
          ref={this.handleRef}
        >
          <InputComponent
            {...this.state}
            {...this.props}
          />
        </div>
      )
    }
  }
