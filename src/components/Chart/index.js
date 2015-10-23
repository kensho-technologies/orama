
import React, {PropTypes} from 'react'
import R from 'ramda'

import defaultTheme from '../defaultTheme'

import linearRegression from 'simple-statistics/src/linear_regression'
import regressionLine from 'simple-statistics/src/linear_regression_line'
import utils from '../../utils'
import * as methods from './methods'

import {Block} from '@luiscarli/display'
import BottomLabel from '../BottomLabel'
import CanvasRender from '../CanvasRender'
import ChartBackground from '../ChartBackground'
import CanvasInput from '../CanvasInput'
import LeftLabel from '../LeftLabel'

/**
 * Main chart component, receives data and name of the properties to be visualized.
 * @example
 * const data = [{p1: 0.34, p2: 0.693}, {p1: 0.012, p2: 0.123}]
 * <Chart
 * 	data={data}
 * 	xProp={p1}
 * 	yProp={p2}
 * >
 */
export default React.createClass({
  displayName: 'Chart',
  propTypes: {
    colorProp: PropTypes.string,
    data: PropTypes.array,
    labelProp: PropTypes.string,
    margin: PropTypes.object,
    radiusProp: PropTypes.string,
    size: PropTypes.object,
    theme: PropTypes.object,
    title: PropTypes.string,
    xName: PropTypes.string,
    xProp: PropTypes.string,
    yName: PropTypes.string,
    yProp: PropTypes.string,
  },
  getDefaultProps() {
    return {
      data: [],
      margin: {
        left: 80, right: 30,
        top: 15, bottom: 60,
      },
      size: {width: 500, height: 400},
      theme: {...defaultTheme},
    }
  },
  render() {
    const {data, xProp, yProp, colorProp, radiusProp, size, theme} = this.props

    const yType = utils.vis.getType(data, yProp)
    const yDomain = utils.vis.getDomain(data, yProp, yType)
    const plotRect = methods.calculateMargin({size, yType, yDomain})

    const xType = utils.vis.getType(data, xProp)
    const xDomain = utils.vis.getDomain(data, xProp, xType)
    const xRange = utils.vis.getRange('x', plotRect, xType)
    const xTickCount = utils.vis.getTickCount('x', xRange)
    const xScale = utils.vis.getScale('x', xType, xDomain, xRange, xTickCount)
    const xMap = utils.vis.getMap(xProp, xScale)

    const yRange = utils.vis.getRange('y', plotRect, yType)
    const yTickCount = utils.vis.getTickCount('y', yRange)
    const yScale = utils.vis.getScale('y', yType, yDomain, yRange, yTickCount)
    const yMap = utils.vis.getMap(yProp, yScale)

    const colorType = utils.vis.getType(data, colorProp)
    const colorDomain = utils.vis.getDomain(data, colorProp, colorType)
    const colorRange = utils.vis.getRange('color', undefined, colorType)
    const colorScale = utils.vis.getScale('color', colorType, colorDomain, colorRange)
    const colorMap = utils.vis.getMap(colorProp, colorScale)

    const radiusType = utils.vis.getType(data, radiusProp)
    const radiusDomain = utils.vis.getDomain(data, radiusProp, radiusType)
    const radiusRange = [2, 14]
    const radiusScale = utils.vis.getScale('radius', radiusType, radiusDomain, radiusRange)
    const radiusMap = utils.vis.getMap(radiusProp, radiusScale)

    const regressionData = R.map(d => {
      return [R.prop(xProp, d), R.prop(yProp, d)]
    }, data)
    const lgStats = linearRegression(regressionData)
    const rlGen = regressionLine(lgStats)
    const rlPath2D = utils.path()
    rlPath2D.moveTo(xScale(xDomain[0]), yScale(rlGen(xDomain[0])))
    rlPath2D.lineTo(xScale(xDomain[1]), yScale(rlGen(xDomain[1])))
    const rlRenderData = {
      label: 'Regression Line',
      tooltip: [
        {
          prop: 'm',
        },
        {
          prop: 'b',
        },
      ],
      path2D: rlPath2D,
      type: 'line',
      raw: lgStats,
    }

    const renderData = R.map(pointD => {
      const x = xMap(pointD)
      const y = yMap(pointD)
      const c = R.prop(colorProp, pointD) && colorMap(pointD)
      const radius = R.prop(radiusProp, pointD) ? radiusMap(pointD) : 5.5
      const path2D = utils.path()
      path2D.arc(x, y, radius, 0, 2 * Math.PI)
      return {
        label: pointD.Name,
        tooltip: [
          {
            prop: xProp,
          },
          {
            prop: yProp,
          },
          {
            prop: colorProp,
          },
          {
            prop: radiusProp,
          },
        ],
        fill: c,
        path2D,
        raw: pointD,
        type: 'area',
        alpha: 0.85,
        x,
        y,
      }
    }, data)
    renderData.push(rlRenderData)
    return (
      <Block // component wrapper
        margin={10}
      >
        <Block // title
          fontFamily={theme.font}
          fontSize={theme.fontSize}
          fontWeight={'bold'}
          marginBottom={10}
        >
          {this.props.title}
        </Block>
        <Block // canvas wrapper
          height={this.props.size.height}
          position={'relative'}
          width={this.props.size.width}
        >
          <ChartBackground
            plotRect={plotRect}
            size={this.props.size}
            xDomain={xDomain}
            xScale={xScale}
            xTickCount={xTickCount}
            xType={xType}
            yDomain={yDomain}
            yScale={yScale}
            yTickCount={yTickCount}
            yType={yType}
          />
          <CanvasRender
            plotRect={plotRect}
            renderData={renderData}
            size={this.props.size}
          />
          <CanvasInput
            plotRect={plotRect}
            renderData={renderData}
            size={this.props.size}
          />
          <LeftLabel
            plotRect={plotRect}
            text={this.props.yName || this.props.yProp}
          />
          <BottomLabel
            plotRect={plotRect}
            text={this.props.xName || this.props.xProp}
          />
        </Block>
      </Block>
    )
  },
})
