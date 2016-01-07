
import React, {PropTypes} from 'react'
import _ from 'lodash'

import {stateHOC} from 'on-update'

import {Block} from 'react-display'
import {Chart} from '../../Chart'
import {Brushes} from '../../Layer'
import {Points} from '../../Layer'

const identityScale = d => d
identityScale.invert = d => d

const reorder = bound => ({
  x1: _.min([bound.x1, bound.x2]),
  x2: _.max([bound.x1, bound.x2]),
  y1: _.min([bound.y1, bound.y2]),
  y2: _.max([bound.y1, bound.y2]),
})
const isOutbound = (bound, plotRect) => {
  if (
    bound.x1 < plotRect.x ||
    bound.x2 > plotRect.x + plotRect.width ||
    bound.y1 < plotRect.y ||
    bound.y2 > plotRect.y + plotRect.height
  ) return true
  return false
}

const handleChart = (props, childProps) => {
  if (childProps.action === 'mouseClick') {
    if (!props.element) {
      props.onState({
        bound: {},
      })
    }
  }
  if (childProps.action === 'mouseDown') {
    const element = childProps.renderDatum && childProps.renderDatum.name
    if (!element) {
      const x = childProps.localMouse.x
      const y = childProps.localMouse.y
      props.onState({
        xScale: childProps.rootProps.xScale,
        yScale: childProps.rootProps.yScale,
        plotRect: childProps.rootProps.plotRect,
        p1: {x, y},
        p2: {},
        element,
      })
    } else {
      props.onState({
        element,
      })
    }
  }
  if (childProps.action === 'mouseDrag') {
    if (!props.element) {
      const x = childProps.localMouse.x
      const y = childProps.localMouse.y
      props.onState({
        p2: {x, y},
      })
    } else {

      props.onState({
        p1: {
          x: props.p1.x - childProps.mouseDelta.x,
          y: props.p1.y - childProps.mouseDelta.y,
        },
        p2: {
          x: props.p2.x - childProps.mouseDelta.x,
          y: props.p2.y - childProps.mouseDelta.y,
        },
      })
    }
  }
  if (childProps.action === 'mouseUp') {
    const element = childProps.renderDatum && childProps.renderDatum.name
    if (!element) {
      props.onState({
        element: undefined,
      })
    }
  }
}
const constraintToPlotRect = (bound, plotRect) => {
  let x1 = bound.x1
  if (x1 < plotRect.x) x1 = plotRect.x
  let x2 = bound.x2
  if (x2 > plotRect.x + plotRect.width) x2 = plotRect.x + plotRect.width
  let y1 = bound.y1
  if (y1 < plotRect.y) y1 = plotRect.y
  let y2 = bound.y2
  if (y2 > plotRect.y + plotRect.height) y2 = plotRect.y + plotRect.height
  return {x1, x2, y1, y2}
}
const getBrushData = props => {
  const _bound = {
    x1: _.min([props.p1.x, props.p2.x]),
    x2: _.max([props.p1.x, props.p2.x]),
    y1: _.min([props.p1.y, props.p2.y]),
    y2: _.max([props.p1.y, props.p2.y]),
  }
  const bound = constraintToPlotRect(_bound, props.plotRect)
  return {
    x1: props.xScale.invert(bound.x1),
    x2: props.xScale.invert(bound.x2),
    y1: props.yScale.invert(bound.y1),
    y2: props.yScale.invert(bound.y2),
  }
}

const _Brush = props => (
  <Block padding={30}>
    <Chart
      height={200}
      onUpdate={childProps => handleChart(props, childProps)}
      yType='log'
    >
      <Points
        alphaValue={0.3}
        data={props.data}
        fill='Name'
        label='Name'
        radiusValue={2}
        tooltipExtraDimensions={['Date']}
        x='Open'
        y='Volume'
      />
      <Brushes
        data={[getBrushData(props)]}
        skipExtractArrays={true}
        tooltipShowKeys={false}
        x1='x1'
        x2='x2'
        y1='y1'
        y2='y2'
      />
    </Chart>
  </Block>
)
_Brush.propTypes = {
  data: PropTypes.array,
  x1: PropTypes.number,
  x2: PropTypes.number,
  y1: PropTypes.number,
  y2: PropTypes.number,
}
_Brush.defaultProps = {
  data: [],
  p1: {},
  p2: {},
  xScale: identityScale,
  yScale: identityScale,
  plotRect: {},
}

export const Brush = stateHOC(_Brush)
