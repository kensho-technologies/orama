
import React, {findDOMNode, PropTypes} from 'react'

import R from 'ramda'

import utils from '../../utils/utils'

const styles = {
  canvas: {
    position: 'absolute',
    display: 'block',
  },
}

export default React.createClass({
  displayName: 'CanvasRender',
  propTypes: {
    plotRect: PropTypes.object,
    renderData: PropTypes.array,
    size: PropTypes.object,
  },
  getDefaultProps() {
    return {
      renderData: [],
      size: {width: 0, height: 0},
    }
  },
  componentDidMount() {
    this.renderCanvas()
  },
  componentDidUpdate() {
    this.renderCanvas()
  },
  renderCanvas() {
    const {plotRect} = this.props
    var ctx = findDOMNode(this.refs.canvas).getContext('2d')
    ctx.fillStyle = 'hsl(0, 0%, 90%)'
    utils.canvas.clearRect(ctx, this.props.size)
    ctx.save()
    ctx.beginPath()
    ctx.rect(plotRect.x - 10, plotRect.y - 10, plotRect.width + 20, plotRect.height + 20)
    ctx.clip()
    ctx.lineWidth = 2
    ctx.globalAlpha = 0.85
    R.forEach(d => {
      ctx.fillStyle = d.fill || 'steelblue'
      ctx.strokeStyle = d.stroke || 'steelblue'
      ctx.fill(d.path2D)
      ctx.stroke(d.path2D)
    }, this.props.renderData)
    ctx.restore()
  },
  render() {
    return (
      <canvas
          style={styles.canvas}
          height={this.props.size.height}
          ref='canvas'
          width={this.props.size.width}
          />
    )
  },
})
