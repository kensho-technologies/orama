
import React, {findDOMNode, PropTypes} from 'react'
import R from 'ramda'

import utils from '../../utils'
import defaultStyleVars from '../styleVars'

export function getStyles(styleVars = defaultStyleVars) {
  return {
    ticks: {
      font: `${styleVars.axis.tickFontSize}px ${styleVars.fontMono}`,
    },
    canvas: {
      position: 'absolute',
      display: 'block',
    },
  }
}

export default React.createClass({
  displayName: 'ChartBackground',
  propTypes: {
    plotRect: PropTypes.object,
    size: PropTypes.object.isRequired,
    styleVars: PropTypes.object,
    xDomain: PropTypes.array,
    xScale: PropTypes.func,
    xTickCount: PropTypes.number,
    xType: PropTypes.string,
    yDomain: PropTypes.array,
    yScale: PropTypes.func,
    yTickCount: PropTypes.number,
    yType: PropTypes.string,
  },
  getDefaultProps() {
    return {
    }
  },
  componentDidMount() {
    this.renderCanvas()
  },
  componentDidUpdate() {
    this.renderCanvas()
  },
  renderCanvas() {
    const styleVars = this.props.styleVars || defaultStyleVars
    const {chartPadding} = styleVars.axis
    const {
      plotRect,
      xDomain,
      xScale,
      xTickCount,
      xType,
      yDomain,
      yScale,
      yTickCount,
      yType,
    } = this.props
    const ctx = findDOMNode(this.refs.canvas).getContext('2d')
    ctx.fillStyle = styleVars.axis.background
    utils.canvas.clearRect(ctx, this.props.size)
    utils.canvas.fillRect(ctx, utils.rect.inset(-chartPadding, this.props.plotRect))

    ctx.font = `${styleVars.axis.tickFontSize}px ${styleVars.fontMono}`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'top'
    const xTicks = utils.vis.getTicks(xType, xDomain, xTickCount)
    R.forEach(d => {
      if (d === 0 && xType === 'linear') {
        ctx.lineWidth = 2.5
        ctx.strokeStyle = styleVars.axis.tickZeroStroke
      } else {
        ctx.lineWidth = 1
        ctx.strokeStyle = styleVars.axis.tickStroke
      }
      ctx.beginPath()
      ctx.moveTo(xScale(d), plotRect.y - chartPadding )
      ctx.lineTo(xScale(d), utils.rect.getMaxY(plotRect) + chartPadding )
      ctx.closePath()
      ctx.stroke()
      ctx.fillStyle = styleVars.axis.color
      ctx.fillText(d, xScale(d), utils.rect.getMaxY(plotRect) + chartPadding + 6)
    }, xTicks)

    ctx.textAlign = 'end'
    ctx.textBaseline = 'middle'
    const yTicks = utils.vis.getTicks(yType, yDomain, yTickCount)
    R.forEach(d => {
      if (d === 0 && yType === 'linear') {
        ctx.lineWidth = 2.5
        ctx.strokeStyle = styleVars.axis.tickZeroStroke
      } else {
        ctx.lineWidth = 1
        ctx.strokeStyle = styleVars.axis.tickStroke
      }
      ctx.beginPath()
      ctx.moveTo(plotRect.x - chartPadding, yScale(d))
      ctx.lineTo(utils.rect.getMaxX(plotRect) + chartPadding, yScale(d))
      ctx.closePath()
      ctx.stroke()
      ctx.fillStyle = styleVars.axis.color
      ctx.fillText(d, plotRect.x - chartPadding - 6, yScale(d))
    }, yTicks)
  },
  render() {
    const styles = getStyles(this.props.styleVars)
    return (
      <canvas
        height={this.props.size.height}
        ref='canvas'
        style={styles.canvas}
        width={this.props.size.width}
      />
    )
  },
})
