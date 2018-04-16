// Copyright 2017 Kensho Technologies, LLC.

import React from 'react'
import PropTypes from 'prop-types'
import {findDOMNode} from 'react-dom'
import _ from 'lodash'

export class BlockSize extends React.Component {
  static propTypes = {
    onUpdate: PropTypes.func.isRequired,
  }
  componentDidMount = () => {
    this.update()
  }
  componentDidUpdate = () => {
    this.update()
  }
  update = () => {
    if (!this.element) return
    const node = findDOMNode(this.element)
    this.props.onUpdate({
      ...this.props,
      width: node.offsetWidth,
      height: node.offsetHeight,
    })
  }
  render() {
    const refClbck = element => {
      this.element = element
    }
    return (
      <div
        {..._.omit(this.props, ['onUpdate', 'onState'])}
        ref={refClbck}
      />
    )
  }
}
