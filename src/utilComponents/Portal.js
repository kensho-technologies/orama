// Copyright 2018 Kensho Technologies, LLC.

import PropTypes from 'prop-types'
import * as React from 'react'
import {createPortal} from 'react-dom'

const isBrowser = typeof document === 'object'

export default class Portal extends React.Component {
  static propTypes = {
    children: PropTypes.node,
  }

  state = {
    hasMounted: false,
  }

  componentDidMount() {
    if (isBrowser) {
      this.containerElement = document.createElement('div')
      this.containerElement.position = 'absolute'
      this.containerElement.top = 0
      this.containerElement.left = 0
      this.containerElement.right = 0
      document.body.appendChild(this.containerElement)
      this.setState({hasMounted: true})
    }
  }

  componentWillUnmount() {
    if (isBrowser && this.containerElement) document.body.removeChild(this.containerElement)
  }

  render() {
    const {children} = this.props
    const {hasMounted} = this.state
    if (!hasMounted) return null
    return createPortal(children, this.containerElement)
  }
}
