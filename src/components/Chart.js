
import React, {PropTypes} from 'react'
import R from 'ramda'

import d3Arrays from 'd3-arrays'
import d3Scale from 'd3-scale'
import utils from '../utils/utils'
import linearRegression from 'simple-statistics/src/linear_regression'
import regressionLine from 'simple-statistics/src/linear_regression_line'

import BottomLabel from './BottomLabel'
import CanvasRender from './CanvasRender'
import ChartBackground from './ChartBackground'
import ChartInput from './ChartInput'
import LeftLabel from './LeftLabel'

export default React.createClass({
  displayName: 'Chart',
  propTypes: {
    colorProp: PropTypes.string,
    data: PropTypes.array,
    margin: PropTypes.object,
    size: PropTypes.object,
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
    }
  },
  render() {
    const {data, xProp, yProp, colorProp, margin, size} = this.props
    const plotRect = utils.rect.marginInset(margin, size)

    const xType = utils.dim.getType(data, xProp)
    console.log(xType)
    const xRange = utils.rect.getRangeX(plotRect)
    const xDomain = d3Arrays.extent(data, R.prop(xProp))
    const xTickCount = utils.ticks.getXCount(xRange)
    const xScale = utils.dim.getAxisScale(null, xDomain, xRange, xTickCount)
    const xMap = R.pipe(R.prop(xProp), xScale)

    const yDomain = d3Arrays.extent(data, R.prop(yProp))
    const yRange = utils.rect.getRangeY(plotRect)
    const yTickCount = utils.ticks.getYCount(yRange)
    const yScale = utils.dim.getAxisScale(null, yDomain, yRange, yTickCount)
    const yMap = R.pipe(R.prop(yProp), yScale)

    const cRange = utils.dim.RANGE_LINEAR_COLOR
    const cDomain = d3Arrays.extent(data, R.prop(colorProp))
    const cScale = d3Scale.linear()
      .domain(cDomain)
      .range(cRange)
    const cMap = R.pipe(R.prop(colorProp), cScale)

    const regressionData = R.map(d => {
      return [R.prop(xProp, d), R.prop(yProp, d)]
    }, data)
    const rlGen = regressionLine(linearRegression(regressionData))
    const rlPath2D = utils.path()
    rlPath2D.moveTo(xScale(xDomain[0]), yScale(rlGen(xDomain[0])))
    rlPath2D.lineTo(xScale(xDomain[1]), yScale(rlGen(xDomain[1])))
    const rlRenderData = {
      label: 'Regression Line',
      path2D: rlPath2D,
      type: 'line',
    }

    const renderData = R.map(pointD => {
      const x = xMap(pointD)
      const y = yMap(pointD)
      const c = R.prop(colorProp, pointD) && cMap(pointD)
      const path2D = utils.path()
      path2D.arc(x, y, 5, 0, 2 * Math.PI)
      return {
        label: pointD.Name || 'point',
        fill: c,
        path2D,
        raw: pointD,
        type: 'area',
        x,
        y,
      }
    }, data)
    renderData.push(rlRenderData)
    const containerStyle = {
      height: this.props.size.height,
      position: 'relative',
      width: this.props.size.width,
    }
    return (
      <div>
        <div style={{fontWeight: 'bold', fontSize: 17, marginLeft: this.props.margin.left}}>{this.props.title}</div>
        <div style={containerStyle}>
          <ChartBackground
              plotRect={plotRect}
              size={this.props.size}
              xScale={xScale}
              xTickCount={xTickCount}
              yScale={yScale}
              yTickCount={yTickCount}
              />
          <CanvasRender
              plotRect={plotRect}
              renderData={renderData}
              size={this.props.size}
              xMap={xMap}
              xScale={xScale}
              yMap={yMap}
              yScale={yScale}
              />
          <ChartInput
              plotRect={plotRect}
              renderData={renderData}
              size={this.props.size}
              />
          <LeftLabel
              text={this.props.yName || this.props.yProp}
              plotRect={plotRect}
              />
          <BottomLabel
              text={this.props.xName || this.props.xProp}
              plotRect={plotRect}
              />
        </div>
      </div>
    )
  },
})
