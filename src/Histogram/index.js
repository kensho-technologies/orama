
import React, {PropTypes} from 'react'
import _ from 'lodash'
import d3 from 'd3'

import {Chart} from '../Chart'
import {bars} from '../plots/bars'
/**
 * Renders a Histogram using the same logic as `Chart`.
 * This component have not been generalized yet.
 * @example
 * // Render Schema
 * <Histogram/>
 *   <CanvasRender/>
 *   <CanvasInput/>
 * </Histogram>
 */
export default React.createClass({
  displayName: 'Histogram',
  propTypes: {
    data: PropTypes.array,
    margin: PropTypes.object,
    size: PropTypes.object,
    styleVars: PropTypes.object,
    theme: PropTypes.object,
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
    const {data, xProp, size} = this.props
    const histogramLayout = d3.layout.histogram()
      .value(d => _.get(d, xProp))
      .bins(20)
    const histogramData = _.map(
      histogramLayout(data),
      d => ({
        x1: d.x,
        x2: d.x + d.dx,
        y: d.y,
      })
    )
    return (
      <Chart
        backgroundOffset={0}
        backgroundShow={false}
        barsGutter={0}
        data={histogramData}
        margin={{left: 0, top: 0, bottom: 0, right: 0}}
        plot={bars}
        size={size}
        x1='x1'
        x2='x2'
        xShowGuides={false}
        y='y'
        yName='frequency'
        yShowGuides={false}
      />
    )
  },
})
