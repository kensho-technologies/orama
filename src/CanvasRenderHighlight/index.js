
import React, {PropTypes} from 'react'
import R from 'ramda'
import shouldPureComponentUpdate from 'react-pure-render/function'
import {BACKGROUND_OFFSET} from '../Chart2/constants'
import utils from '../utils'

import defaultTheme from '../defaultTheme'

/**
 * Canvas rendering function
 */
export const renderCanvas = (props, ctx) => {
  const {
    plotRect,
    highlightData = [],
    size = {width: 100, height: 100},
    backgroundOffset = BACKGROUND_OFFSET,
  } = props

  utils.canvas.clearRect(ctx, size)
  if (highlightData.length === 0) return
  ctx.save()
  if (plotRect && props.clip) {
    ctx.rect(
      plotRect.x - backgroundOffset,
      plotRect.y - backgroundOffset,
      plotRect.width + backgroundOffset * 2,
      plotRect.height + backgroundOffset * 2,
    )
    ctx.clip()
  }
  ctx.globalAlpha = 0.7
  ctx.fillStyle = 'hsl(0, 0%, 97%)'
  ctx.rect(
    plotRect.x - backgroundOffset,
    plotRect.y - backgroundOffset,
    plotRect.width + backgroundOffset * 2,
    plotRect.height + backgroundOffset * 2,
  )
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
  }, highlightData)
  ctx.restore()
}

/**
 * Component create a Canvas and use the renderData for drawing geometries on it.
 * The renderData follows a specific format.
 */
export default React.createClass({
  displayName: 'CanvasRenderHighlight',
  propTypes: {
    highlightData: PropTypes.array,
    plotRect: PropTypes.object,
    size: PropTypes.object.isRequired,
  },
  getDefaultProps() {
    return {
      highlightData: [],
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
