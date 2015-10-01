
import React, {PropTypes} from 'react'
import R from 'ramda'
import d3 from 'd3'

import utils from '../../utils'

import {Block} from '../jsxstyle'
import CanvasRender from '../CanvasRender'
import ChartInput from '../ChartInput'

/**
 * Renders a Histogram using the same logic as `Chart`.
 * This component have not been generalized yet.
 * @example
 * // Render Schema
 * <Histogram/>
 *   <CanvasRender/>
 *   <ChartInput/>
 * </Histogram>
 */
export default React.createClass({
  displayName: 'Histogram',
  propTypes: {
    data: PropTypes.array,
    margin: PropTypes.object,
    size: PropTypes.object,
    styleVars: PropTypes.object,
    xName: PropTypes.string,
    xProp: PropTypes.string,
    xType: PropTypes.string,
  },
  getDefaultProps() {
    return {
      data: [],
      margin: {
        left: 5, right: 5,
        top: 5, bottom: 5,
      },
      size: {width: 500, height: 400},
    }
  },
  render() {
    const {data, xProp, size, margin} = this.props

    const plotRect = utils.rect.marginInset(margin, size)

    const xType = this.props.xType ||
      utils.vis.getType(data, xProp)
    const xDomain = utils.vis.getDomain(data, xProp, xType)
    const xRange = utils.vis.getRange('x', plotRect, xType)
    const xTickCount = 20
    const xScale = utils.vis.getScale('x', xType, xDomain, xRange, xTickCount)

    const histogramLayout = d3.layout.histogram()
      .value(R.prop(xProp))
      .bins(20)
    const histogramData = histogramLayout(data)

    const yProp = 'y'
    const yType = 'linear'
    const yDomain = utils.vis.getDomain(histogramData, yProp, yType)
    const yRange = utils.vis.getRange('y', plotRect, yType)
    const yScale = utils.vis.getScale('y', yType, yDomain, yRange)
    const yMap = utils.vis.getMap(yProp, yScale)

    const xMap = utils.vis.getMap('x', xScale)

    const renderData = R.map(pointD => {
      const x = xMap(pointD)
      const y = yMap(pointD)
      const path2D = utils.path()
      path2D.rect(x, y, plotRect.width / 20 - 2, size.height - y)
      return {
        label: `${pointD.x}, ${pointD.y}`,
        tooltip: [],
        path2D,
        raw: pointD,
        type: 'area',
        x,
        y,
      }
    }, histogramData)

    if (xType !== 'linear') return null
    return (
      <Block
        height={this.props.size.height}
        position={'relative'}
        width={this.props.size.width}
      >
        <CanvasRender
          plotRect={plotRect}
          renderData={renderData}
          size={this.props.size}
          styleVars={this.props.styleVars}
        />
        <ChartInput
          plotRect={plotRect}
          renderData={renderData}
          size={this.props.size}
        />
      </Block>
    )
  },
})
