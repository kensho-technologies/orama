
import React, {PropTypes} from 'react'

import d3Arrays from 'd3-arrays'
import d3Scale from 'd3-scale'
import utils from '../utils/utils'

import CanvasRender from './CanvasRender'

export default React.createClass({
  displayName: 'Chart2',
  propTypes: {
    data: PropTypes.array,
    size: PropTypes.shape({
      height: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
    }),
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
      .range(xRange)
      .domain(xDomain)
      .nice(utils.ticks.getYCount(xDomain))
    const xMap = R.pipe(R.prop(xProp), xScale)
    const yRange = utils.rect.getRangeY(plotRect)
    const yDomain = d3Arrays.extent(data, R.prop(yProp))
    const yScale = d3Scale.linear()
      .range(yRange)
      .domain(yDomain)
      .nice(utils.ticks.getYCount(yDomain))
    const yMap = R.pipe(R.prop(yProp), xScale)

    const renderData = [
      {type: 'point', values: data}
    ]

    return (
      <div>
        <CanvasRender
            plotRect={plotRect}
            renderData={renderData}
            size={this.props.size}
            xScale={xScale}
            yScale={yScale}
            xMap={xMap}
            yMap={yMap}
            />
      </div>
    )
  },
})
