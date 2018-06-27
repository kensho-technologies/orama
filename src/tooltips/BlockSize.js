// Copyright 2018 Kensho Technologies, LLC.

import * as React from 'react'
import PropTypes from 'prop-types'

export default class BlockSize extends React.Component {
  static propTypes = {
    onState: PropTypes.func,
    onUpdate: PropTypes.func.isRequired,
  }

  elementRef = React.createRef()

  componentDidMount() {
    this.update()
  }

  componentDidUpdate() {
    this.update()
  }

  update() {
    if (!this.elementRef.current) return
    const {onUpdate} = this.props
    const {offsetHeight: height, offsetWidth: width} = this.elementRef.current
    onUpdate({...this.props, height, width})
  }

  render() {
    const {onUpdate, onState, ...rest} = this.props
    return <div {...rest} ref={this.elementRef} />
  }
}
