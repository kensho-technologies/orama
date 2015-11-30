
import React, {PropTypes} from 'react'
import _ from 'lodash'
import {DEFAULT_THEME} from '../defaultTheme'
import {getPath2D} from '../utils/path2DUtils'
import {getTicks} from '../Chart/getMethods'
import {inset} from '../utils/rectUtils'

import {Block} from 'react-display'
import CanvasRender from '../CanvasRender'
import BottomLabel from '../BottomLabel'
import LeftLabel from '../LeftLabel'

const BACKGROUND_OFFSET = 15

export const getBackground = props => {
  if (props.backgroundShow === false) return undefined
  const {
    backgroundOffset = BACKGROUND_OFFSET,
    plotRect,
    theme,
  } = props
  const backgroundRect = inset(
    -backgroundOffset,
    plotRect
  )
  const backgroundPath = getPath2D()
  backgroundPath.rect(
    backgroundRect.x, backgroundRect.y,
    backgroundRect.width, backgroundRect.height
  )
  return {
    path2D: backgroundPath,
    type: 'area',
    fill: theme.axis.background,
  }
}
export const getXGuides = (props, thick) => {
  if (!_.contains(props.dimensions, 'x')) return undefined
  if (props.xShowGuides === false) return undefined
  const {
    backgroundOffset = BACKGROUND_OFFSET,
    plotRect,
    theme,
    xScale,
    xTicks,
  } = props
  return _.map(
    xTicks,
    d => {
      const linePath = getPath2D()
      const x = xScale(d.value)
      linePath.moveTo(
        x,
        plotRect.y - backgroundOffset
      )
      linePath.lineTo(
        x,
        plotRect.y + plotRect.height + backgroundOffset,
      )
      return {
        path2D: linePath,
        type: 'line',
        stroke: thick ? theme.axis.tickZeroStroke : theme.axis.tickStroke,
      }
    },
  )
}
export const getYGuides = (props, thick) => {
  if (!_.contains(props.dimensions, 'y')) return undefined
  if (props.yShowGuides === false) return undefined
  const {
    backgroundOffset = BACKGROUND_OFFSET,
    plotRect,
    theme,
    yScale,
    yTicks,
  } = props
  return _.map(
    yTicks,
    d => {
      const linePath = getPath2D()
      const y = yScale(d.value)
      linePath.moveTo(
        plotRect.x - backgroundOffset,
        y
      )
      linePath.lineTo(
        plotRect.x + plotRect.width + backgroundOffset,
        y
      )
      return {
        path2D: linePath,
        type: 'line',
        stroke: thick ? theme.axis.tickZeroStroke : theme.axis.tickStroke,
      }
    },
  )
}
export const getXText = props => {
  if (!_.contains(props.dimensions, 'x')) return undefined
  if (props.xShowTicks === false) return undefined
  const {theme} = props
  const defaultOffset = theme.fontSize * (theme.lineHeight - 1)
  const {
    backgroundOffset = BACKGROUND_OFFSET,
    plotRect,
    xScale,
    xTickOffset = defaultOffset,
    xTicks,
  } = props
  return _.map(
    xTicks,
    d => ({
      type: 'text',
      value: d.text,
      x: xScale(d.value),
      y: _.sum([
        backgroundOffset,
        plotRect.y,
        plotRect.height,
        xTickOffset,
      ]),
      textBaseline: 'top',
      textAlign: 'center',
      font: `${theme.fontSize}px ${theme.fontMono}`,
    }),
  )
}
export const getYText = props => {
  if (!_.contains(props.dimensions, 'y')) return undefined
  if (props.yShowTicks === false) return undefined
  const {theme} = props
  const defaultOffset = theme.fontSize * (theme.lineHeight - 1)
  const {
    backgroundOffset = BACKGROUND_OFFSET,
    plotRect,
    yScale,
    yTickOffset = defaultOffset,
    yTicks,
  } = props
  return _.map(
    yTicks,
    d => ({
      type: 'text',
      value: d.text,
      x: _.sum([
        plotRect.x,
        -backgroundOffset,
        -yTickOffset,
      ]),
      y: yScale(d.value),
      textAlign: 'right',
      textBaseline: 'middle',
      font: `${theme.fontSize}px ${theme.fontMono}`,
    }),
  )
}
export const getBackgroundRenderData = props => {
  const background = getBackground(props)
  const xTicks = props.xTicks || getTicks(props, 'x')
  const yTicks = props.yTicks || getTicks(props, 'y')
  const xGuides = getXGuides({...props, xTicks})
  const yGuides = getYGuides({...props, yTicks})
  const xText = getXText({...props, xTicks})
  const yText = getYText({...props, yTicks})
  const thickXGuide = getXGuides({
    ...props,
    xTicks: _.filter(xTicks, d => d.value === 0),
  }, true)
  const thickYGuide = getYGuides({
    ...props,
    yTicks: _.filter(yTicks, d => d.value === 0),
  }, true)
  return _.flatten(_.compact([
    background,
    xGuides, yGuides,
    thickXGuide, thickYGuide,
    xText, yText,
  ]))
}

/*
Used inside </>
*/
const ChartBackground = props => (
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
ChartBackground.propTypes = {
  onUpdate: PropTypes.func,
  plotRect: PropTypes.object,
  size: PropTypes.object,
  theme: PropTypes.object,
  x: PropTypes.string,
  xName: PropTypes.string,
  y: PropTypes.string,
  yName: PropTypes.string,
}
ChartBackground.defaultProps = {
  theme: DEFAULT_THEME,
}

export default ChartBackground
