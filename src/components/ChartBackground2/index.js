
import React, {PropTypes} from 'react'
import _ from 'lodash'
import defaultTheme from '../defaultTheme'
import path from '../../utils/path'
import {getTicks} from '../Chart2/getMethods'
import {inset} from '../../utils/rectUtils'

import {Block} from '@luiscarli/display'
import CanvasRender from '../CanvasRender'
import BottomLabel from '../BottomLabel'
import LeftLabel from '../LeftLabel'

const backgroundOffset = 15

const getBackgroundRenderData = props => {
  const {
    backgroundOffset,
    plotRect,
    theme,
  } = props
  const backgroundRect = inset(
    -backgroundOffset,
    plotRect
  )
  const backgroundPath = path()
  backgroundPath.rect(
    backgroundRect.x, backgroundRect.y,
    backgroundRect.width, backgroundRect.height
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
      linePath.moveTo(
        props.xScale(d),
        plotRect.y - backgroundOffset
      )
      linePath.lineTo(
        props.xScale(d),
        plotRect.y + plotRect.height + backgroundOffset,
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
      linePath.moveTo(
        plotRect.x - backgroundOffset,
        props.yScale(d)
      )
      linePath.lineTo(
        plotRect.x + plotRect.width + backgroundOffset,
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
      y: _.sum([
        backgroundOffset,
        plotRect.y,
        plotRect.height,
        theme.fontSize * theme.lineHeight - theme.fontSize,
      ]),
      textBaseline: 'top',
      textAlign: 'center',
      font: `${theme.fontSize}px ${theme.fontMono}`,
    }),
  )
  const yText = _.map(
    yTicks,
    d => ({
      type: 'text',
      value: d,
      x: _.sum([
        plotRect.x,
        -backgroundOffset,
        -(theme.fontSize * theme.lineHeight - theme.fontSize),
      ]),
      y: props.yScale(d),
      textAlign: 'right',
      textBaseline: 'middle',
      font: `${theme.fontSize}px ${theme.fontMono}`,
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
      theme={props.theme}
    />
    <LeftLabel
      plotRect={props.plotRect}
      text={props.yName || props.y}
      theme={props.theme}
    />
    <BottomLabel
      plotRect={props.plotRect}
      text={props.xName || props.x}
      theme={props.theme}
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
