// Copyright 2018 Kensho Technologies, LLC.

import * as React from 'react'
import PropTypes from 'prop-types'
import {includes} from 'lodash'

import withControlledState from '../enhancers/withControlledState'
import {Brushes} from '../Layer'

const BRUSH_ELEMENT_NAMES = [
  'brushesCenter',
  'brushesLeft',
  'brushesRight',
  'brushesTop',
  'brushesBottom',
  'brushesLeftTop',
  'brushesRightTop',
  'brushesRightBottom',
  'brushesLeftBottom',
]

const reorder = bounds => ({
  x1: Math.min(bounds.x1, bounds.x2),
  x2: Math.max(bounds.x1, bounds.x2),
  y1: Math.min(bounds.y1, bounds.y2),
  y2: Math.max(bounds.y1, bounds.y2),
})

function isOutOfBounds(bounds, plotRect) {
  return (
    bounds.x1 < plotRect.x ||
    bounds.x2 > plotRect.x + plotRect.width ||
    bounds.y1 < plotRect.y ||
    bounds.y2 > plotRect.y + plotRect.height
  )
}

function constraintToPlotRect(bounds, childProps) {
  const {
    rootProps: {plotRect},
  } = childProps
  let {x1, x2, y1, y2} = bounds
  if (x1 < plotRect.x) x1 = plotRect.x
  if (x2 > plotRect.x + plotRect.width) x2 = plotRect.x + plotRect.width
  if (y1 < plotRect.y) y1 = plotRect.y
  if (y2 > plotRect.y + plotRect.height) y2 = plotRect.y + plotRect.height
  return {x1, x2, y1, y2}
}

function domainToBounds(props, childProps) {
  const {rootProps} = childProps
  return {
    x1: rootProps.xScale(props.xDomain[0]),
    x2: rootProps.xScale(props.xDomain[1]),
    y1: rootProps.yScale(props.yDomain[0]),
    y2: rootProps.yScale(props.yDomain[1]),
  }
}

function boundsToDomain(bounds, childProps) {
  const {rootProps} = childProps
  return {
    xDomain: [rootProps.xScale.invert(bounds.x1), rootProps.xScale.invert(bounds.x2)],
    yDomain: [rootProps.yScale.invert(bounds.y1), rootProps.yScale.invert(bounds.y2)],
  }
}

const getBrushData = props => ({
  x1: props.xDomain[0],
  x2: props.xDomain[1],
  y1: props.yDomain[0],
  y2: props.yDomain[1],
})

function updateBounds(props, childProps, partialBounds) {
  const newBounds = reorder({...props._bounds, ...partialBounds})
  if (isOutOfBounds(newBounds, childProps.rootProps.plotRect)) {
    const constrainedBounds = constraintToPlotRect(newBounds, childProps)
    props.onUpdate(boundsToDomain(constrainedBounds, childProps))
  } else {
    props.onUpdate(boundsToDomain(newBounds, childProps))
  }
}

function mouseDown(props, childProps) {
  const brushElementName = childProps.renderDatum && childProps.renderDatum.name
  if (!includes(BRUSH_ELEMENT_NAMES, brushElementName)) {
    props.onState({
      _bounds: {
        x1: childProps.localMouse.x,
        y1: childProps.localMouse.y,
      },
      brushElementName,
    })
    props.onUpdate({xDomain: undefined, yDomain: undefined})
  } else {
    props.onState({
      _bounds: domainToBounds(props, childProps),
      brushElementName,
    })
  }
}

function mouseDrag(props, childProps) {
  if (props.brushElementName === 'brushesCenter') {
    const bounds = domainToBounds(props, childProps)
    const mBounds = {
      x1: bounds.x1 - childProps.mouseDelta.x,
      x2: bounds.x2 - childProps.mouseDelta.x,
      y1: bounds.y1 - childProps.mouseDelta.y,
      y2: bounds.y2 - childProps.mouseDelta.y,
    }
    if (isOutOfBounds(mBounds, childProps.rootProps.plotRect)) {
      const constrainedBounds = constraintToPlotRect(bounds, childProps)
      props.onUpdate(boundsToDomain(constrainedBounds, childProps))
    } else {
      props.onUpdate(boundsToDomain(mBounds, childProps))
    }
  } else if (props.brushElementName === 'brushesLeft') {
    updateBounds(props, childProps, {x1: childProps.localMouse.x})
  } else if (props.brushElementName === 'brushesRight') {
    updateBounds(props, childProps, {x2: childProps.localMouse.x})
  } else if (props.brushElementName === 'brushesTop') {
    updateBounds(props, childProps, {y1: childProps.localMouse.y})
  } else if (props.brushElementName === 'brushesBottom') {
    updateBounds(props, childProps, {y2: childProps.localMouse.y})
  } else if (props.brushElementName === 'brushesLeftTop') {
    updateBounds(props, childProps, {
      x1: childProps.localMouse.x,
      y1: childProps.localMouse.y,
    })
  } else if (props.brushElementName === 'brushesRightTop') {
    updateBounds(props, childProps, {
      x2: childProps.localMouse.x,
      y1: childProps.localMouse.y,
    })
  } else if (props.brushElementName === 'brushesRightBottom') {
    updateBounds(props, childProps, {
      x2: childProps.localMouse.x,
      y2: childProps.localMouse.y,
    })
  } else if (props.brushElementName === 'brushesLeftBottom') {
    updateBounds(props, childProps, {
      x1: childProps.localMouse.x,
      y2: childProps.localMouse.y,
    })
  } else {
    const bounds = reorder({
      ...props._bounds,
      x2: childProps.localMouse.x,
      y2: childProps.localMouse.y,
    })
    const cBounds = constraintToPlotRect(bounds, childProps)
    props.onUpdate(boundsToDomain(cBounds, childProps))
  }
  if (props.onMouseDown) props.onMouseDown()
}

function mouseUp(props) {
  if (props.onMouseUp) props.onMouseUp()
}

function handleChart(props, childProps) {
  switch (childProps.action) {
    case 'mouseDown':
      mouseDown(props, childProps)
      break
    case 'mouseDrag':
      mouseDrag(props, childProps)
      break
    case 'mouseUp':
      mouseUp(props, childProps)
      break
    default:
  }
}

function StatelessBrush(props) {
  const child = React.Children.only(props.children)
  const brushElement = (
    <Brushes
      data={[getBrushData(props)]}
      fillAlphaValue={props.fillAlphaValue}
      fillValue={props.fillValue}
      key="brushes"
      lineWidthValue={props.lineWidthValue}
      skipExtractArrays
      strokeValue={props.strokeValue}
      tooltipShowKeys={false}
      x1="x1"
      x2="x2"
      y1="y1"
      y2="y2"
      {...props}
    />
  )
  const layers = React.Children.toArray(child.props.children).concat(brushElement)
  const onUpdate = childProps => handleChart(props, childProps)
  return React.cloneElement(child, {onUpdate}, layers)
}

StatelessBrush.propTypes = {
  children: PropTypes.node,
  fillAlphaValue: PropTypes.number,
  fillValue: PropTypes.number,
  lineWidthValue: PropTypes.number,
  strokeValue: PropTypes.string,
  xDomain: PropTypes.array,
  yDomain: PropTypes.array,
}

StatelessBrush.defaultProps = {
  xDomain: [],
  yDomain: [],
}

export default withControlledState(StatelessBrush)
