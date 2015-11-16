
import React, {PropTypes} from 'react'
import _ from 'lodash'
import defaultTheme from '../defaultTheme'
import path from '../../utils/path'
import {getTicks} from '../Chart2/getMethods'

import {Block} from '@luiscarli/display'
import CanvasRender from '../CanvasRender'
import BottomLabel from '../BottomLabel'
import LeftLabel from '../LeftLabel'

const getBackgroundRenderData = props => {
  const {
    plotRect,
    theme,
  } = props
  const backgroundPath = path()
  backgroundPath.rect(
    plotRect.x, plotRect.y,
    plotRect.width, plotRect.height
  )
  const background = {
    path2D: backgroundPath,
    type: 'area',
    fill: theme.axis.background,
  }
  const xTicks = props.xTicks || getTicks(props, 'x')
  const yTicks = props.yTicks || getTicks(props, 'y')
  const xGuides = _.map(
    xTicks,
    d => {
      const linePath = path()
      linePath.moveTo(props.xScale(d), plotRect.y)
      linePath.lineTo(
        props.xScale(d),
        plotRect.y + plotRect.height,
      )
      return {
        path2D: linePath,
        type: 'line',
        stroke: theme.axis.tickStroke,
      }
    },
  )
  const yGuides = _.map(
    yTicks,
    d => {
      const linePath = path()
      linePath.moveTo(plotRect.x, props.yScale(d))
      linePath.lineTo(
        plotRect.x + plotRect.width,
        props.yScale(d)
      )
      return {
        path2D: linePath,
        type: 'line',
        stroke: theme.axis.tickStroke,
      }
    },
  )
  const xText = _.map(
    xTicks,
    d => ({
      type: 'text',
      value: d,
      x: props.xScale(d),
      y: plotRect.y + plotRect.height + theme.axis.tickFontSize * 1.5,
      textAlign: 'center',
      font: `${theme.axis.tickFontSize}px ${theme.fontMono}`,
    }),
  )
  const yText = _.map(
    yTicks,
    d => ({
      type: 'text',
      value: d,
      x: plotRect.x - theme.axis.tickFontSize,
      y: props.yScale(d),
      textAlign: 'right',
      textBaseline: 'middle',
      font: `${theme.axis.tickFontSize}px ${theme.fontMono}`,
    }),
  )
  return [].concat(background, xGuides, yGuides, xText, yText)
}

/*
Used inside </>
*/
const ChartBackground2 = props => (
  <Block>
    <CanvasRender
      plotRect={props.plotRect}
      renderData={getBackgroundRenderData(props)}
      size={props.size}
    />
    <LeftLabel
      plotRect={props.plotRect}
      text={props.yName || props.y}
    />
    <BottomLabel
      plotRect={props.plotRect}
      text={props.xName || props.x}
    />
  </Block>
)
ChartBackground2.propTypes = {
  onUpdate: PropTypes.func,
  plotRect: PropTypes.object,
  size: PropTypes.object,
  theme: PropTypes.object,
  x: PropTypes.string,
  xName: PropTypes.string,
  y: PropTypes.string,
  yName: PropTypes.string,
}
ChartBackground2.defaultProps = {
  theme: defaultTheme,
}

export default ChartBackground2
