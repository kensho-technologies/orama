// Copyright 2018 Kensho Technologies, LLC.

import * as React from 'react'
import PropTypes from 'prop-types'

import * as CustomPropTypes from '../CustomPropTypes'
import isBrowser from '../constants/isBrowser'

import Portal from './Portal'
import DefaultTooltip from './Tooltip'

export default class TooltipContainer extends React.Component {
  static propTypes = {
    hoverData: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    layerProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    margin: PropTypes.number,
    mouse: PropTypes.shape({x: PropTypes.number, y: PropTypes.number}),
    theme: CustomPropTypes.theme,
  }

  static defaultProps = {
    margin: 15,
  }

  state = {
    hasEverMounted: false,
    height: null,
    width: null,
  }

  static getDerivedStateFromProps(props) {
    return props.mouse && props.hoverData ? {hasEverMounted: true} : null
  }

  handleMeasure = (height, width) => {
    this.setState(prevState => {
      if (height === prevState.height && width === prevState.width) return null
      return {height, width}
    })
  }

  getTranslation() {
    const {height, width} = this.state
    const {margin, mouse} = this.props
    if (!width || !height) return undefined
    const innerHeight = isBrowser ? window.innerHeight : 1000
    const innerWidth = isBrowser ? window.innerWidth : 1000
    let x
    if (mouse.x + width + margin * 2 + 1 > innerWidth) {
      if (width + margin * 2 > mouse.x) x = margin
      else x = mouse.x - width - margin
    } else x = mouse.x + margin
    let y
    if (mouse.y + height + margin * 2 + 1 > innerHeight) {
      if (height + margin * 2 > mouse.y) y = margin
      else y = mouse.y - height - margin
    } else y = mouse.y + margin
    return `translate(${x}px, ${y}px)`
  }

  renderTooltip() {
    const {hoverData, layerProps, theme} = this.props
    const {Tooltip = DefaultTooltip} = layerProps
    const style = {
      pointerEvents: 'none',
      position: 'fixed',
      zIndex: 999999,
      transform: this.getTranslation(),
    }
    return (
      <div style={style}>
        <Tooltip
          hoverData={hoverData}
          layerProps={layerProps}
          onMeasure={this.handleMeasure}
          theme={theme}
        />
      </div>
    )
  }

  render() {
    const {hoverData, mouse} = this.props
    const {hasEverMounted} = this.state
    // only mount the Portal if we've ever needed to render the tooltip
    return hasEverMounted && <Portal>{!!mouse && !!hoverData && this.renderTooltip()}</Portal>
  }
}
