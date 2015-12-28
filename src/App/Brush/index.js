
import React, {PropTypes} from 'react'

import {stateHOC} from 'on-update'

import {Block} from 'react-display'
import {Chart} from '../../Chart'
import {Brushes} from '../../Layer'
import {Points} from '../../Layer'

const handleChart = (props, childProps) => {
  if (childProps.isMouseDown) {
    const x1 = childProps.rootProps.xScale.invert(childProps.mouseDownLocalMouse.x)
    const y1 = childProps.rootProps.yScale.invert(childProps.mouseDownLocalMouse.y)
    props.onState({
      x1, y1,
    })
  }
  if (childProps.isDragging) {
    const x2 = childProps.rootProps.xScale.invert(childProps.hoverLocalMouse.x)
    const y2 = childProps.rootProps.yScale.invert(childProps.hoverLocalMouse.y)
    props.onState({
      x2, y2,
    })
  }
}

const _Brush = props => (
  <Block padding={30}>
    <Chart
      height={400}
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
        data={[{x1: props.x1, x2: props.x2, y1: props.y1, y2: props.y2}]}
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
}

export const Brush = stateHOC(_Brush)
