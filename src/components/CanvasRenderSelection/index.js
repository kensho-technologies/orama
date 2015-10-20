
import React, {PropTypes} from 'react'
import R from 'ramda'
import shouldPureComponentUpdate from 'react-pure-render/function'

import utils from '../../utils'

import defaultTheme from '../defaultTheme'

/**
 * Canvas rendering function
 */
export const renderCanvas = (props, ctx) => {
  const {
    plotRect,
    renderSelectionData = [],
    size = {width: 100, height: 100},
  } = props

  utils.canvas.clearRect(ctx, size)
  if (renderSelectionData.length === 0) return
  ctx.save()
  if (plotRect) {
    ctx.rect(plotRect.x - 20, plotRect.y - 20, plotRect.width + 40, plotRect.height + 40)
    ctx.clip()
  }
  ctx.globalAlpha = 0.7
  ctx.fillStyle = 'hsl(0, 0%, 97%)'
  ctx.rect(plotRect.x - 20, plotRect.y - 20, plotRect.width + 40, plotRect.height + 40)
  ctx.fill()
  R.forEach(d => {
    ctx.globalAlpha = d.alpha || 1
    if (d.type === 'line') {
      ctx.lineWidth = d.lineWidth || 2
      ctx.strokeStyle = d.stroke || 'hsl(200,30%, 50%)'
      ctx.stroke(d.path2D)
    } else if (d.type === 'area') {
      ctx.fillStyle = d.fill || 'hsl(200,30%, 50%)'
      ctx.fill(d.path2D)
    }
  }, renderSelectionData)
  ctx.restore()
}

/**
 * Component create a Canvas and use the renderData for drawing geometries on it.
 * The renderData follows a specific format.
 */
export default React.createClass({
  displayName: 'CanvasRenderSelection',
  propTypes: {
    plotRect: PropTypes.object,
    renderSelectionData: PropTypes.array,
    size: PropTypes.object.isRequired,
  },
  getDefaultProps() {
    return {
      renderSelectionData: [],
      size: {width: 0, height: 0},
      theme: {...defaultTheme},
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
