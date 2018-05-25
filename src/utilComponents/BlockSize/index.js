// Copyright 2018 Kensho Technologies, LLC.

import * as React from 'react'
import PropTypes from 'prop-types'

export default class BlockSize extends React.Component {
  static propTypes = {
    onState: PropTypes.func,
    onUpdate: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.update()
  }

  componentDidUpdate() {
    this.update()
  }

  update() {
    if (!this.element) return
    this.props.onUpdate({
      ...this.props,
      width: this.element.offsetWidth,
      height: this.element.offsetHeight,
    })
  }

  elementRef = ref => {
    this.element = ref
  }

  render() {
    const {onUpdate, onState, ...rest} = this.props
    return <div {...rest} ref={this.elementRef} />
  }
}
