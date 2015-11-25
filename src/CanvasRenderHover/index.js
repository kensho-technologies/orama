
import React, {PropTypes} from 'react'
import _ from 'lodash'
import {BACKGROUND_OFFSET} from '../Chart2/constants'

import defaultTheme from '../defaultTheme'

/**
 * Canvas rendering function
 */
export const renderCanvas = (props, ctx) => {
  const {
    plotRect,
    hoverData = [],
    size,
    backgroundOffset = BACKGROUND_OFFSET,
  } = props

  ctx.clearRect(
    0, 0,
    size.width,
    size.height
  )
  ctx.save()
  if (plotRect && props.clip) {
    ctx.beginPath()
    ctx.rect(
      plotRect.x - backgroundOffset,
      plotRect.y - backgroundOffset,
      plotRect.width + backgroundOffset * 2,
      plotRect.height + backgroundOffset * 2,
    )
    ctx.clip()
  }
  _.each(
    hoverData,
    d => {
      if (!d) return
      ctx.lineWidth = d.hoverLineWidth || 2
      ctx.strokeStyle = d.hoverStroke || 'black'
      ctx.stroke(d.path2D)
    }
  )
  ctx.restore()
}

/**
 * Component create a Canvas and use the renderData for drawing geometries on it.
 * The renderData follows a specific format.
 */
export default React.createClass({
  displayName: 'CanvasRenderHover',
  propTypes: {
    clip: PropTypes.bool,
    hoverData: PropTypes.array,
    plotRect: PropTypes.object,
    size: PropTypes.object.isRequired,
  },
  getDefaultProps() {
    return {
      hoverData: [],
      size: {width: 0, height: 0},
      theme: {...defaultTheme},
    }
  },
  componentDidMount() {
    this.handleUpdate()
  },
  shouldComponentUpdate(nextProps) {
    if (this.props.size !== nextProps.size) return true
    return false
  },
  componentDidUpdate() {
    this.handleUpdate()
  },
  componentWillReceiveProps(nextProps) {
    if (this.props.hoverData !== nextProps.hoverData) {
      this.handleUpdate()
    }
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
