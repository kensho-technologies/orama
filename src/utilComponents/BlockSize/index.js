// Copyright 2018 Kensho Technologies, LLC.

import * as React from 'react'
import PropTypes from 'prop-types'
import {findDOMNode} from 'react-dom'
import {omit} from 'lodash'

export class BlockSize extends React.Component {
  static propTypes = {
    onUpdate: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.update()
  }

  componentDidUpdate() {
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
    function refClbck(element) {
      this.element = element
    }
    return <div {...omit(this.props, ['onUpdate', 'onState'])} ref={refClbck} />
  }
}
