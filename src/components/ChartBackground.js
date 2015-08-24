
import React, {findDOMNode, PropTypes} from 'react'

import utils from '../utils/utils'
import {getStyleVars} from '../utils/styleVars'

const styleVars = getStyleVars()
const styles = {
  canvas: {
    position: 'absolute',
    display: 'block',
  },
}

export default React.createClass({
  displayName: 'ChartBackground',
  propTypes: {
    plotRect: PropTypes.object,
    size: PropTypes.object,
    xScale: PropTypes.func,
    xTickCount: PropTypes.number,
    yScale: PropTypes.func,
    yTickCount: PropTypes.number,
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
    const {plotRect, xScale, xTickCount, yScale, yTickCount} = this.props
    const ctx = findDOMNode(this.refs.canvas).getContext('2d')
    ctx.fillStyle = styleVars.axis.background
    utils.canvas.clearRect(ctx, this.props.size)
    utils.canvas.fillRect(ctx, utils.rect.inset(-10, this.props.plotRect))

    ctx.font = `${styleVars.axis.tickFontSize}px sans-serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'top'
    const xTicks = xScale.ticks(xTickCount)
    const xTicksSmall = xScale.ticks(xTicks.length * 2)
    R.forEach(d => {
      ctx.lineWidth = 1
      ctx.strokeStyle = 'hsl(0, 0%, 92%)'
      ctx.beginPath()
      ctx.moveTo(xScale(d), plotRect.y - 10 )
      ctx.lineTo(xScale(d), utils.rect.getMaxY(plotRect) + 10 )
      ctx.closePath()
      ctx.stroke()
    }, xTicksSmall)
    R.forEach(d => {
      if (d === 0) {
        ctx.lineWidth = 3
      } else {
        ctx.lineWidth = 1
      }
      ctx.strokeStyle = 'lightgray'
      ctx.beginPath()
      ctx.moveTo(xScale(d), utils.rect.getMaxY(plotRect) + 10 )
      ctx.lineTo(xScale(d), utils.rect.getMaxY(plotRect) + 20 )
      ctx.closePath()
      ctx.stroke()
      ctx.strokeStyle = 'white'
      ctx.beginPath()
      ctx.moveTo(xScale(d), plotRect.y - 10 )
      ctx.lineTo(xScale(d), utils.rect.getMaxY(plotRect) + 10 )
      ctx.closePath()
      ctx.stroke()
      ctx.fillStyle = 'black'
      ctx.fillText(d, xScale(d), utils.rect.getMaxY(plotRect) + 24)
    }, xTicks)


    ctx.textAlign = 'end'
    ctx.textBaseline = 'middle'
    const yTicks = yScale.ticks(yTickCount)
    const yTicksSmall = yScale.ticks(yTicks.length * 2)
    R.forEach(d => {
      ctx.lineWidth = 1
      ctx.strokeStyle = 'hsl(0, 0%, 92%)'
      ctx.beginPath()
      ctx.moveTo(plotRect.x - 10, yScale(d))
      ctx.lineTo(utils.rect.getMaxX(plotRect) + 10, yScale(d))
      ctx.closePath()
      ctx.stroke()
    }, yTicksSmall)
    R.forEach(d => {
      if (d === 0) {
        ctx.lineWidth = 3
      } else {
        ctx.lineWidth = 1
      }
      ctx.strokeStyle = 'lightgray'
      ctx.beginPath()
      ctx.moveTo(plotRect.x - 20, yScale(d))
      ctx.lineTo(plotRect.x - 10, yScale(d))
      ctx.closePath()
      ctx.stroke()
      ctx.strokeStyle = 'white'
      ctx.beginPath()
      ctx.moveTo(plotRect.x - 10, yScale(d))
      ctx.lineTo(utils.rect.getMaxX(plotRect) + 10, yScale(d))
      ctx.closePath()
      ctx.stroke()
      ctx.fillStyle = 'black'
      ctx.fillText(d, plotRect.x - 26, yScale(d))
    }, yTicks)
  },
  render() {
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
