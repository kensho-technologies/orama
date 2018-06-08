// Copyright 2018 Kensho Technologies, LLC.

import * as React from 'react'
import PropTypes from 'prop-types'
import {compact, findLast, filter, flatten, includes, map, sum} from 'lodash'

import * as CustomPropTypes from '../CustomPropTypes'
import getPath2D from '../utils/getPath2D'
import getTicks from '../chartCore/getTicks'
import inset from '../utils/rect/inset'
import Canvas from '../canvas/Canvas'
import basicRender from '../canvas/basicRender'

import BottomLabel from './BottomLabel'
import LeftLabel from './LeftLabel'

export default class ChartBackground extends React.Component {
  static propTypes = {
    backgroundShow: PropTypes.bool,
    backgroundOffset: PropTypes.number.isRequired,
    groupedKeys: PropTypes.arrayOf(PropTypes.string),
    height: PropTypes.number,
    layers: PropTypes.arrayOf(PropTypes.object),
    plotRect: CustomPropTypes.plotRect.isRequired,
    theme: CustomPropTypes.theme.isRequired,
    width: PropTypes.number,
    x: PropTypes.string,
    xName: PropTypes.string,
    xScale: PropTypes.func,
    xShowGuides: PropTypes.bool,
    xShowLabel: PropTypes.bool.isRequired,
    xShowTicks: PropTypes.bool,
    xTicks: PropTypes.arrayOf(PropTypes.object),
    xTickOffset: PropTypes.number,
    y: PropTypes.string,
    yName: PropTypes.string,
    yScale: PropTypes.func,
    yShowGuides: PropTypes.bool,
    yShowLabel: PropTypes.bool.isRequired,
    yShowTicks: PropTypes.bool,
    yTicks: PropTypes.arrayOf(PropTypes.object),
    yTickOffset: PropTypes.number,
  }

  getBackground() {
    const {backgroundShow, backgroundOffset, plotRect, theme} = this.props
    if (backgroundShow === false) return undefined
    const {height, width, x, y} = inset(-backgroundOffset, plotRect)
    const path2D = getPath2D()
    path2D.rect(x, y, width, height)
    return {
      fill: theme.plotBackgroundFill,
      path2D,
      stroke: 'transparent',
      type: 'area',
    }
  }

  getXGuides(xTicks, thick) {
    const {backgroundOffset, groupedKeys, plotRect, theme, xScale, xShowGuides} = this.props
    if (!includes(groupedKeys, 'x')) return undefined
    if (xShowGuides === false) return undefined
    return map(xTicks, d => {
      const path2D = getPath2D()
      const x = xScale(d.value)
      path2D.moveTo(x, plotRect.y - backgroundOffset)
      path2D.lineTo(x, plotRect.y + plotRect.height + backgroundOffset)
      return {
        path2D,
        type: 'line',
        lineWidth: thick ? theme.guideZeroLineWidth : theme.guideLineWidth,
        stroke: thick ? theme.guideZeroStroke : theme.guideStroke,
      }
    })
  }

  getYGuides(yTicks, thick) {
    const {backgroundOffset, groupedKeys, plotRect, theme, yScale, yShowGuides} = this.props
    if (!includes(groupedKeys, 'y')) return undefined
    if (yShowGuides === false) return undefined
    return map(yTicks, d => {
      const path2D = getPath2D()
      const y = yScale(d.value)
      path2D.moveTo(plotRect.x - backgroundOffset, y)
      path2D.lineTo(plotRect.x + plotRect.width + backgroundOffset, y)
      return {
        path2D,
        type: 'line',
        lineWidth: thick ? theme.guideZeroLineWidth : theme.guideLineWidth,
        stroke: thick ? theme.guideZeroStroke : theme.guideStroke,
      }
    })
  }

  getXText(xTicks) {
    const {groupedKeys, theme, xShowTicks} = this.props
    if (!includes(groupedKeys, 'x')) return undefined
    if (xShowTicks === false) return undefined
    const defaultOffset = theme.axisTickFontSize * (theme.lineHeight - 1)
    const {backgroundOffset, plotRect, xScale, xTickOffset = defaultOffset} = this.props
    return map(xTicks, d => ({
      type: 'text',
      text: d.text,
      x: xScale(d.value),
      y: sum([backgroundOffset, plotRect.y, plotRect.height, xTickOffset]),
      textBaseline: 'top',
      textAlign: 'center',
      font: `${theme.axisTickFontSize}px ${theme.fontFamilyMono}`,
    }))
  }

  getYText(yTicks) {
    const {groupedKeys, theme, yShowTicks} = this.props
    if (!includes(groupedKeys, 'y')) return undefined
    if (yShowTicks === false) return undefined
    const defaultOffset = theme.axisTickFontSize * (theme.lineHeight - 1)
    const {backgroundOffset, plotRect, yScale, yTickOffset = defaultOffset} = this.props
    return map(yTicks, d => ({
      type: 'text',
      text: d.text,
      x: sum([plotRect.x, -backgroundOffset, -yTickOffset]),
      y: yScale(d.value),
      textAlign: 'right',
      textBaseline: 'middle',
      fill: theme.textFill,
      font: `${theme.axisTickFontSize}px ${theme.fontFamilyMono}`,
    }))
  }

  getBackgroundRenderData() {
    const background = this.getBackground()
    const xTicks = this.props.xTicks || getTicks(this.props, 'x')
    const yTicks = this.props.yTicks || getTicks(this.props, 'y')
    const xGuides = this.getXGuides(xTicks)
    const yGuides = this.getYGuides(yTicks)
    const xText = this.getXText(xTicks)
    const yText = this.getYText(yTicks)
    const thickXGuide = this.getXGuides(filter(xTicks, d => d.value === 0), true)
    const thickYGuide = this.getYGuides(filter(yTicks, d => d.value === 0), true)
    return flatten(compact([background, xGuides, yGuides, thickXGuide, thickYGuide, xText, yText]))
  }

  getLabelText(key) {
    const {layers} = this.props
    const keyName = `${key}Name`
    const text = this.props[keyName] || this.props[key]
    if (text) return text
    const layer = findLast(layers, d => d[keyName] || d[key])
    if (layer) return layer[keyName] || layer[key]
    return undefined
  }

  render() {
    const {height, plotRect, theme, width, xShowLabel, yShowLabel} = this.props
    return (
      <React.Fragment>
        <Canvas
          height={height}
          plotRect={plotRect}
          render={basicRender}
          renderData={this.getBackgroundRenderData()}
          theme={theme}
          width={width}
        />
        {yShowLabel && (
          <LeftLabel plotRect={plotRect} text={this.getLabelText('y')} theme={theme} />
        )}
        {xShowLabel && (
          <BottomLabel plotRect={plotRect} text={this.getLabelText('x')} theme={theme} />
        )}
      </React.Fragment>
    )
  }
}
