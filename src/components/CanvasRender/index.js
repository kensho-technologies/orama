
import React, {findDOMNode, PropTypes} from 'react'

import R from 'ramda'

import utils from '../../utils'

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
    ctx.rect(plotRect.x - 20, plotRect.y - 20, plotRect.width + 40, plotRect.height + 40)
    ctx.clip()
    ctx.lineWidth = 2
    R.forEach(d => {
      ctx.globalAlpha = 0.85
      ctx.fillStyle = d.fill || 'hsl(200,30%, 50%)'
      ctx.strokeStyle = d.stroke || 'hsl(200,30%, 50%)'
      ctx.fill(d.path2D)
      ctx.globalAlpha = 1
      if (d.type === 'line') ctx.stroke(d.path2D)
    }, this.props.renderData)
    ctx.restore()
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
