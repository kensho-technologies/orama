
import React, {findDOMNode, PropTypes} from 'react'

import R from 'ramda'

import utils from '../utils/utils'

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
    }
  },
  componentDidMount() {
    this.renderCanvas()
  },
  componentDidUpdate() {
    this.renderCanvas()
  },
  renderCanvas() {
    var ctx = findDOMNode(this.refs.canvas).getContext('2d')
    ctx.fillStyle = 'hsl(0, 0%, 90%)'
    utils.canvas.clearRect(ctx, this.props.size)
    utils.canvas.fillRect(ctx, utils.rect.inset(-10, this.props.plotRect))

    R.forEach(d => {
      ctx.fillStyle = d.fill || 'black'
      ctx.fill(d.path2D)
    }, this.props.renderData)
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
