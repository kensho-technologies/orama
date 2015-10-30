
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
    renderHoverData = [],
    size = {width: 100, height: 100},
  } = props

  utils.canvas.clearRect(ctx, size)
  ctx.save()
  if (plotRect) {
    ctx.rect(plotRect.x - 20, plotRect.y - 20, plotRect.width + 40, plotRect.height + 40)
    ctx.clip()
  }
  R.forEach(d => {
    if (!d) return
    ctx.lineWidth = d.lineWidth || 2
    ctx.strokeStyle = d.stroke || 'black'
    ctx.stroke(d.path2D)
  }, renderHoverData)
  ctx.restore()
}

/**
 * Component create a Canvas and use the renderData for drawing geometries on it.
 * The renderData follows a specific format.
 */
export default React.createClass({
  displayName: 'CanvasRenderHover',
  propTypes: {
    plotRect: PropTypes.object,
    renderHoverData: PropTypes.array,
    size: PropTypes.object.isRequired,
  },
  getDefaultProps() {
    return {
      renderHoverData: [],
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
