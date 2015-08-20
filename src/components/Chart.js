
import React from 'react'
import R from 'ramda'

import utils from '../utils/utils'

var {findDOMNode, PropTypes} = React

var styles = {
  container: {
    position: 'relative',
  },
  canvas: {
    display: 'block',
  },
  label: {
    position: 'absolute',
    transform: 'rotate(-90deg) translateY(100%)',
    bottom: 30,
    left: 10,
    width: 400 - 60,
    fontSize: 16,
    textAlign: 'center',
    transformOrigin: 'left bottom',
  },
}

/**
 * Component description
 */
export default React.createClass({
  displayName: 'Chart',
  propTypes: {
    data: PropTypes.array.isRequired,
    dimensions: PropTypes.object.isRequired,
    margin: PropTypes.object.isRequired,
    size: PropTypes.object.isRequired,
  },
  getDefaultProps() {
    return {
      size: {
        width: 600,
        height: 400,
      },
      margin: {
        left: 80, right: 20,
        top: 20, bottom: 50,
      },
      data: [],
    }
  },
  componentDidMount() {
    this.renderCanvas()
  },
  componentDidUpdate() {
    this.renderCanvas()
  },
  renderCanvas() {
    var {
      data,
      dimensions,
      margin,
      size,
    } = this.props

    const plotRect = utils.rect.marginInset(margin, size)
    const expandedDim = R.pipe(
      utils.dim.mergeDomains(data),
      utils.dim.mergeRanges(plotRect),
      utils.dim.mergeScales
    )(dimensions)

    const mappedData = utils.map.mapToPoints(expandedDim, data)

    var ctx = findDOMNode(this.refs.canvas).getContext('2d')
    ctx.fillStyle = 'hsl(0, 0%, 90%)'
    ctx.strokeStyle = 'black'
    ctx.globalAlpha = 1
    ctx.lineWidth = 2

    utils.canvas.clearRect(ctx, size)
    // utils.canvas.strokeRect(ctx, size)
    utils.canvas.fillRect(ctx, utils.rect.inset(-10, plotRect))

    ctx.font = '14px sans-serif'
    ctx.textAlign = 'end'
    ctx.textBaseline = 'middle'
    const yTicks = utils.ticks.getYTicks(expandedDim)
    R.forEach(d => {
      if (d === 0) {
        ctx.lineWidth = 3
      } else {
        ctx.lineWidth = 1
      }
      const scale = expandedDim.y.scale
      ctx.strokeStyle = 'lightgray'
      ctx.beginPath()
      ctx.moveTo(plotRect.x - 20, scale(d))
      ctx.lineTo(plotRect.x - 10, scale(d))
      ctx.closePath()
      ctx.stroke()
      ctx.strokeStyle = 'white'
      ctx.beginPath()
      ctx.moveTo(plotRect.x - 10, scale(d))
      ctx.lineTo(utils.rect.getMaxX(plotRect) + 10, scale(d))
      ctx.closePath()
      ctx.stroke()
      ctx.fillStyle = 'black'
      ctx.fillText(d, plotRect.x - 25, scale(d))
    }, yTicks)

    ctx.textAlign = 'center'
    ctx.textBaseline = 'top'
    const xTicks = utils.ticks.getXTicks(expandedDim)
    R.forEach(d => {
      if (d === 0) {
        ctx.lineWidth = 3
      } else {
        ctx.lineWidth = 1
      }
      const scale = expandedDim.x.scale
      ctx.strokeStyle = 'lightgray'
      ctx.beginPath()
      ctx.moveTo(scale(d), utils.rect.getMaxY(plotRect) + 10 )
      ctx.lineTo(scale(d), utils.rect.getMaxY(plotRect) + 20 )
      ctx.closePath()
      ctx.stroke()
      ctx.strokeStyle = 'white'
      ctx.beginPath()
      ctx.moveTo(scale(d), plotRect.y - 10 )
      ctx.lineTo(scale(d), utils.rect.getMaxY(plotRect) + 10 )
      ctx.closePath()
      ctx.stroke()
      ctx.fillStyle = 'black'
      ctx.fillText(d, scale(d), utils.rect.getMaxY(plotRect) + 22)
    }, xTicks)

    ctx.save()
    ctx.beginPath()
    ctx.rect(plotRect.x - 10, plotRect.y - 10, plotRect.width + 20, plotRect.height + 20)
    ctx.clip()
    ctx.globalAlpha = 0.75
    R.forEach(d => {
      ctx.fillStyle = d.color || 'black'
      ctx.fill(d.path2D)
    }, mappedData)
    ctx.restore()
  },
  render() {
    return (
      <div style={styles.container}>
        <div style={styles.label}>
        </div>
        <canvas
            height={this.props.size.height}
            ref='canvas'
            style={styles.canvas}
            width={this.props.size.width}
            />
      </div>
    )
  },
})
