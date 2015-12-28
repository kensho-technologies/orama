
import React, {PropTypes} from 'react'

import {stateHOC} from 'on-update'
import {brushes} from '../../plots/brushes'

import {Block} from 'react-display'
import {Chart} from '../../Chart'

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
      layers={[
        // {
        //   data: _.filter(props.data, d => d.Open > props.x1 && d.Open < props.x2 && d.Volume > props.y2 && d.Volume < props.y1),
        //   skipExtractArrays: true,
        //   fillValue: 'red',
        // },
        {
          data: [{x1: props.x1, x2: props.x2, y1: props.y1, y2: props.y2}],
          plot: brushes,
          x1: 'x1', y1: 'y1',
          x2: 'x2', y2: 'y2',
          skipExtractArrays: true,
          tooltipShowKeys: false,
          hoverFill: 'none',
        },
      ]}
      alphaValue={0.3}
      data={props.data}
      fill='Name'
      height={300}
      label='Name'
      radiusValue={2}
      tooltipExtraDimensions={['Date']}
      x='Open'
      y='Volume'
      yType='log'
      onUpdate={childProps => handleChart(props, childProps)}
    />
  </Block>
)
_Brush.defaultProps = {
  data: [],
}

export const Brush = stateHOC(_Brush)
