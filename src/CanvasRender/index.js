
import React, {PropTypes} from 'react'
import _ from 'lodash'
import shouldPureComponentUpdate from 'react-pure-render/function'

import utils from '../utils'

import defaultTheme from '../defaultTheme'

/**
 * Canvas rendering function
 */
export const renderCanvas = (props, ctx) => {
  const {
    plotRect,
    renderData = [],
    size = {width: 100, height: 100},
  } = props

  utils.canvas.clearRect(ctx, size)
  ctx.save()
  if (plotRect && props.clip) {
    ctx.rect(plotRect.x - 20, plotRect.y - 20, plotRect.width + 40, plotRect.height + 40)
    ctx.clip()
  }
  _.each(
    renderData,
    d => {
      if (!d) return
      ctx.globalAlpha = _.isUndefined(d.alpha) ? 1 : d.alpha
      if (d.type === 'line') {
        ctx.lineWidth = d.lineWidth || 2
        ctx.strokeStyle = d.stroke || 'hsl(200,30%, 50%)'
        ctx.stroke(d.path2D)
      } else if (d.type === 'area') {
        ctx.lineWidth = d.lineWidth
        ctx.strokeStyle = d.stroke
        ctx.fillStyle = d.fill || 'hsl(200,30%, 50%)'
        ctx.fill(d.path2D)
      } else if (d.type === 'text') {
        ctx.font = d.font || '14px verdana'
        ctx.fillStyle = d.fill || 'black'
        ctx.textAlign = d.textAlign || 'left'
        ctx.textBaseline = d.textBaseline || 'alphabetic'
        ctx.fillText(d.value, d.x, d.y)
      }
    },
  )
  ctx.restore()
}

/**
 * Component create a Canvas and use the renderData for drawing geometries on it.
 * The renderData follows a specific format.
 */
export default React.createClass({
  displayName: 'CanvasRender',
  propTypes: {
    clip: PropTypes.bool,
    plotRect: PropTypes.object,
    renderData: PropTypes.array,
    size: PropTypes.object.isRequired,
  },
  getDefaultProps() {
    return {
      renderData: [],
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
