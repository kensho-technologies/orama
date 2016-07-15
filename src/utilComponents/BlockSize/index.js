
import React, {PropTypes} from 'react'
import {findDOMNode} from 'react-dom'
import {Block} from 'react-display'
import _ from 'lodash/fp'

export const BlockSize = React.createClass({
  propTypes: {
    onUpdate: PropTypes.func.isRequired,
  },
  componentDidMount() {
    this.update()
  },
  componentDidUpdate() {
    this.update()
  },
  update() {
    if (!this.element) return
    const node = findDOMNode(this.element)
    this.props.onUpdate({
      ...this.props,
      width: node.offsetWidth,
      height: node.offsetHeight,
    })
  },
  render() {
    const refClbck = element => {
      this.element = element
    }
    return (
      <Block
        {..._.omit(['onUpdate', 'onState'], this.props)}
        ref={refClbck}
      />
    )
  },
})
