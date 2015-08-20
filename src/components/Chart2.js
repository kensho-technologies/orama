
import React, {PropTypes} from 'react'

import d3Arrays from 'd3-arrays'
import d3Scale from 'd3-scale'
import utils from '../utils/utils'

import CanvasRender from './CanvasRender'
import ChartInput from './ChartInput'

export default React.createClass({
  displayName: 'Chart2',
  propTypes: {
    data: PropTypes.array,
    margin: PropTypes.object,
    size: PropTypes.object,
    xProp: PropTypes.string,
    yProp: PropTypes.string,
  },
  getDefaultProps() {
    return {
      data: [],
      margin: {
        left: 80, right: 30,
        top: 15, bottom: 50,
      },
      size: {width: 700, height: 500},
    }
  },
  render() {
    const {data, xProp, yProp, margin, size} = this.props
    const plotRect = utils.rect.marginInset(margin, size)
    const xRange = utils.rect.getRangeX(plotRect)
    const xDomain = d3Arrays.extent(data, R.prop(xProp))
    const xScale = d3Scale.linear()
      .domain(xDomain)
      .range(xRange)
      .nice(utils.ticks.getXCount(xRange))
    const xMap = R.pipe(R.prop(xProp), xScale)
    const yRange = utils.rect.getRangeY(plotRect)
    const yDomain = d3Arrays.extent(data, R.prop(yProp))
    const yScale = d3Scale.linear()
      .domain(yDomain)
      .range(yRange)
      .nice(utils.ticks.getYCount(yRange))
    const yMap = R.pipe(R.prop(yProp), yScale)

    const renderData = R.map(pointD => {
      const x = xMap(pointD)
      const y = yMap(pointD)
      const path2D = utils.path()
      path2D.arc(x, y, 5, 0, 2 * Math.PI)
      return {
        type: 'point',
        path2D,
        raw: pointD,
        x,
        y,
      }
    }, data)

    return (
      <div style={{position: 'relative'}}>
        <CanvasRender
            plotRect={plotRect}
            renderData={renderData}
            size={this.props.size}
            xScale={xScale}
            yScale={yScale}
            xMap={xMap}
            yMap={yMap}
            />
        <ChartInput
            plotRect={plotRect}
            renderData={renderData}
            size={this.props.size}
            />
      </div>
    )
  },
})
