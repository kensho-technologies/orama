// Copyright 2018 Kensho Technologies, LLC.

import * as React from 'react'
import PropTypes from 'prop-types'

import Brushes from '../layers/Brushes'

const BRUSH_ELEMENT_NAMES = new Set([
  'brushesCenter',
  'brushesLeft',
  'brushesRight',
  'brushesTop',
  'brushesBottom',
  'brushesLeftTop',
  'brushesRightTop',
  'brushesRightBottom',
  'brushesLeftBottom',
])

function isOutOfBounds(bounds, plotRect) {
  return (
    bounds.x1 < plotRect.x ||
    bounds.x2 > plotRect.x + plotRect.width ||
    bounds.y1 < plotRect.y ||
    bounds.y2 > plotRect.y + plotRect.height
  )
}

function reorder(bounds) {
  const {x1, x2, y1, y2} = bounds
  return {x1: Math.min(x1, x2), x2: Math.max(x1, x2), y1: Math.min(y1, y2), y2: Math.max(y1, y2)}
}

function constrainToPlotRect(bounds, plotRect) {
  const {height, width, x, y} = plotRect
  const {x1, x2, y1, y2} = bounds
  return {
    x1: Math.max(x1, x),
    x2: Math.min(x2, x + width),
    y1: Math.max(y1, y),
    y2: Math.min(y2, y + height),
  }
}

function domainToBounds(rootProps, xDomain, yDomain) {
  const {xScale, yScale} = rootProps
  const [x1, x2] = xDomain
  const [y1, y2] = yDomain
  return {x1: xScale(x1), x2: xScale(x2), y1: yScale(y1), y2: yScale(y2)}
}

function boundsToDomain(bounds, xScale, yScale) {
  const {x1, x2, y1, y2} = bounds
  return {
    xDomain: [xScale.invert(x1), xScale.invert(x2)],
    yDomain: [yScale.invert(y1), yScale.invert(y2)],
  }
}

export default class Brush extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    onUpdate: PropTypes.func.isRequired,
    xDomain: PropTypes.array, // eslint-disable-line react/forbid-prop-types
    yDomain: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  }

  static defaultProps = {
    xDomain: [],
    yDomain: [],
  }

  state = {}

  handleMouseDown(childProps) {
    const {localMouse, renderDatum, rootProps} = childProps
    const {onUpdate, xDomain, yDomain} = this.props
    const brushElementName = renderDatum && renderDatum.name
    if (BRUSH_ELEMENT_NAMES.has(brushElementName)) {
      const bounds = domainToBounds(rootProps, xDomain, yDomain)
      this.setState({bounds, brushElementName})
    } else {
      const bounds = {x1: localMouse.x, y1: localMouse.y}
      this.setState({bounds, brushElementName})
      onUpdate({xDomain: undefined, yDomain: undefined})
    }
  }

  handleMouseDrag(childProps) {
    const {localMouse, mouseDelta, rootProps} = childProps
    const nextBounds = this.getNextBounds(localMouse, mouseDelta, rootProps)
    this.updateBounds(nextBounds, rootProps)
  }

  handleUpdate = childProps => {
    if (childProps.action === 'mouseDown') this.handleMouseDown(childProps)
    else if (childProps.action === 'mouseDrag') this.handleMouseDrag(childProps)
  }

  getNextBounds(localMouse, delta, rootProps) {
    const {brushElementName} = this.state
    const {x, y} = localMouse
    if (brushElementName === 'brushesLeft') return {x1: x}
    if (brushElementName === 'brushesRight') return {x2: x}
    if (brushElementName === 'brushesTop') return {y1: y}
    if (brushElementName === 'brushesBottom') return {y2: y}
    if (brushElementName === 'brushesLeftTop') return {x1: x, y1: y}
    if (brushElementName === 'brushesRightTop') return {x2: x, y1: y}
    if (brushElementName === 'brushesLeftBottom') return {x1: x, y2: y}
    if (brushElementName === 'brushesRightBottom') return {x2: x, y2: y}
    if (brushElementName === 'brushesCenter') {
      const {xDomain, yDomain} = this.props
      const {x1, x2, y1, y2} = domainToBounds(rootProps, xDomain, yDomain)
      const nextBounds = {x1: x1 - delta.x, x2: x2 - delta.x, y1: y1 - delta.y, y2: y2 - delta.y}
      return isOutOfBounds(nextBounds, rootProps.plotRect) ? {x1, x2, y1, y2} : nextBounds
    }
    return {x2: x, y2: y}
  }

  updateBounds(nextBounds, rootProps) {
    const {onUpdate} = this.props
    const {bounds} = this.state
    const {plotRect, xScale, yScale} = rootProps
    const orderedBounds = reorder({...bounds, ...nextBounds})
    const constrainedBounds = constrainToPlotRect(orderedBounds, plotRect)
    onUpdate(boundsToDomain(constrainedBounds, xScale, yScale))
  }

  render() {
    const {children, xDomain, yDomain, ...rest} = this.props
    const [x1, x2] = xDomain
    const [y1, y2] = yDomain
    const child = React.Children.only(children)
    const brushElement = (
      <Brushes
        {...rest}
        data={[{x1, x2, y1, y2}]}
        key="brushes"
        skipExtractArrays
        tooltipShowKeys={false}
        x1="x1"
        x2="x2"
        y1="y1"
        y2="y2"
      />
    )
    const layers = [...React.Children.toArray(child.props.children), brushElement]
    return React.cloneElement(child, {onUpdate: this.handleUpdate}, layers)
  }
}
