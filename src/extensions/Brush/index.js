
import React, {PropTypes} from 'react'
import _ from 'lodash'

import {stateHOC} from 'on-update'
import {Brushes} from '../../Layer'

const BRUSH_ELEMENT_NAMES = ['brushesCenter', 'brushesLeft', 'brushesRight', 'brushesTop', 'brushesBottom', 'brushesLeftTop', 'brushesRightTop', 'brushesRightBottom', 'brushesLeftBottom']

const reorder = bounds => ({
  x1: _.min([bounds.x1, bounds.x2]),
  x2: _.max([bounds.x1, bounds.x2]),
  y1: _.min([bounds.y1, bounds.y2]),
  y2: _.max([bounds.y1, bounds.y2]),
})
const isOutOfBounds = (bounds, plotRect) => {
  if (
    bounds.x1 < plotRect.x ||
    bounds.x2 > plotRect.x + plotRect.width ||
    bounds.y1 < plotRect.y ||
    bounds.y2 > plotRect.y + plotRect.height
  ) return true
  return false
}
const constraintToPlotRect = (bounds, childProps) => {
  const {rootProps: {plotRect}} = childProps
  let x1 = bounds.x1
  if (x1 < plotRect.x) x1 = plotRect.x
  let x2 = bounds.x2
  if (x2 > plotRect.x + plotRect.width) x2 = plotRect.x + plotRect.width
  let y1 = bounds.y1
  if (y1 < plotRect.y) y1 = plotRect.y
  let y2 = bounds.y2
  if (y2 > plotRect.y + plotRect.height) y2 = plotRect.y + plotRect.height
  return {x1, x2, y1, y2}
}
const domainToBounds = (props, childProps) => {
  const {rootProps} = childProps
  return {
    x1: rootProps.xScale(props.xDomain[0]),
    x2: rootProps.xScale(props.xDomain[1]),
    y1: rootProps.yScale(props.yDomain[0]),
    y2: rootProps.yScale(props.yDomain[1]),
  }
}
const boundsToDomain = (bounds, childProps) => {
  const {rootProps} = childProps
  return {
    xDomain: [
      rootProps.xScale.invert(bounds.x1),
      rootProps.xScale.invert(bounds.x2),
    ],
    yDomain: [
      rootProps.yScale.invert(bounds.y1),
      rootProps.yScale.invert(bounds.y2),
    ],
  }
}
const getBrushData = props => ({
  x1: props.xDomain[0],
  x2: props.xDomain[1],
  y1: props.yDomain[0],
  y2: props.yDomain[1],
})
const updateBounds = (props, childProps, partialBounds) => {
  const newBounds = reorder({
    ...props._bounds,
    ...partialBounds,
  })
  if (isOutOfBounds(newBounds, childProps.rootProps.plotRect)) {
    const constrainedBounds = constraintToPlotRect(newBounds, childProps)
    props.onUpdate(boundsToDomain(constrainedBounds, childProps))
  } else {
    props.onUpdate(boundsToDomain(newBounds, childProps))
  }
}

const mouseDown = (props, childProps) => {
  const brushElementName = childProps.renderDatum && childProps.renderDatum.name
  if (!_.includes(BRUSH_ELEMENT_NAMES, brushElementName)) {
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
const mouseDrag = (props, childProps) => {
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
}

const handleChart = (props, childProps) => {
  switch (childProps.action) {
    case 'mouseDown': mouseDown(props, childProps)
      break
    case 'mouseDrag': mouseDrag(props, childProps)
      break
    default:
  }
}

const _Brush = props => {
  const child = React.Children.only(props.children)
  if (child.type.displayName === 'ChartWidthHOC') {
    const BrushElement = (
      <Brushes
        data={[getBrushData(props)]}
        fillAlphaValue={props.fillAlphaValue}
        fillValue={props.fillValue}
        key='brushes'
        lineWidthValue={props.lineWidthValue}
        skipExtractArrays={true}
        strokeValue={props.strokeValue}
        tooltipShowKeys={false}
        x1='x1'
        x2='x2'
        y1='y1'
        y2='y2'
      />
    )
    const layers = React.Children.toArray(child.props.children).concat(
      BrushElement,
    )
    return React.cloneElement(
      child,
      {onUpdate: childProps => handleChart(props, childProps)},
      layers
    )
  }
  return <div/>
}

_Brush.propTypes = {
  children: PropTypes.node,
  fillAlphaValue: PropTypes.number,
  fillValue: PropTypes.number,
  lineWidthValue: PropTypes.number,
  strokeValue: PropTypes.number,
  xDomain: PropTypes.array,
  yDomain: PropTypes.array,
}
_Brush.defaultProps = {
  xDomain: [],
  yDomain: [],
}

export const Brush = stateHOC(_Brush)
