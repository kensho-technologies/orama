// Copyright 2018 Kensho Technologies, LLC.

import PropTypes from 'prop-types'
import * as React from 'react'
import {createPortal} from 'react-dom'

import isBrowser from '../constants/isBrowser'

export default class Portal extends React.Component {
  static propTypes = {
    children: PropTypes.node,
  }

  state = {
    hasMounted: false,
  }

  componentDidMount() {
    if (isBrowser) {
      const containerElement = document.createElement('div')
      containerElement.style.position = 'absolute'
      containerElement.style.top = 0
      containerElement.style.left = 0
      containerElement.style.right = 0
      document.body.appendChild(containerElement)
      this.containerElement = containerElement
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
