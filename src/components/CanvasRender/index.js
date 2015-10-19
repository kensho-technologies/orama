
import React, {PropTypes} from 'react'
import R from 'ramda'
import shouldPureComponentUpdate from 'react-pure-render/function'

import utils from '../../utils'

// import defaultTheme from '../defaultTheme'

/**
 * Canvas rendering function
 */
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
    if (d.type === 'line') {
      ctx.lineWidth = d.lineWidth || 2
      ctx.strokeStyle = d.stroke || 'hsl(200,30%, 50%)'
      ctx.stroke(d.path2D)
      ctx.lineWidth = d.lineWidth || 2
    } else if (d.type === 'area') {
      ctx.fillStyle = d.fill || 'hsl(200,30%, 50%)'
      ctx.fill(d.path2D)
    }
  }, renderData)
  ctx.restore()
}

/**
 * Component create a Canvas and use the renderData dor drawing geometries on it.
 * The renderData follows a specific format.
 */
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
  shouldComponentUpdate: shouldPureComponentUpdate,
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
