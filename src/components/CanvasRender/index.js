
import React, {PropTypes} from 'react'
import R from 'ramda'

import utils from '../../utils'

// import defaultTheme from '../defaultTheme'

export const renderCanvas = (props, ctx) => {
  const {
    plotRect,
    renderData = [],
    size = {width: 100, height: 100},
  } = props

  ctx.fillStyle = 'hsl(0, 0%, 90%)'
  utils.canvas.clearRect(ctx, size)
  ctx.save()
  if (plotRect) {
    ctx.rect(plotRect.x - 20, plotRect.y - 20, plotRect.width + 40, plotRect.height + 40)
    ctx.clip()
  }
  R.forEach(d => {
    ctx.globalAlpha = d.alpha || 1
    ctx.fillStyle = d.fill || 'hsl(200,30%, 50%)'
    ctx.strokeStyle = d.stroke || 'hsl(200,30%, 50%)'
    ctx.fill(d.path2D)
    if (d.type === 'line') {
      ctx.stroke(d.path2D)
      ctx.lineWidth = d.lineWidth || 2
    }
  }, renderData)
  ctx.restore()
}

export default React.createClass({
  displayName: 'CanvasRender',
  propTypes: {
    plotRect: PropTypes.object,
    renderData: PropTypes.array,
    size: PropTypes.object.isRequired,
  },
  getDefaultProps() {
    return {
      renderData: [],
      size: {width: 0, height: 0},
      // theme: {...defaultTheme},
    }
  },
  componentDidMount() {
    this.handleUpdate()
  },
  componentDidUpdate() {
    this.handleUpdate()
  },
  handleUpdate() {
    const ctx = this.refs.canvas.getContext('2d')
    renderCanvas(this.props, ctx)
  },
  render() {
    return (
      <canvas
        height={this.props.size.height}
        ref='canvas'
        style={{
          position: 'absolute',
          display: 'block',
        }}
        width={this.props.size.width}
      />
    )
  },
})
