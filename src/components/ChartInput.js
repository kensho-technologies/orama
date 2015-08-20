
import React, {findDOMNode} from 'react'
import R from 'ramda'

import utils from '../utils/utils'

const styles = {
  tooltip: {
    position: 'absolute',
  },
  canvas: {
    position: 'absolute',
    display: 'block',
  },
}

export default React.createClass({
  displayName: 'ChartInput',
  propTypes: {
    renderData: PropTypes.array,
    size: PropTypes.object,
  },
  getDefaultProps() {
    return {
      renderData: [],
    }
  },
  getInitialState() {
    return {
      tooltipShow: false,
      tooltipTop: 0,
      tooltipLeft: 0,
    }
  },
  componentDidMount() {
    this.renderCanvas()
  },
  componentDidUpdate() {
    this.renderCanvas()
  },
  onMouseMove(evt) {
    const canvasNode = findDOMNode(this.refs.canvas)
    const canvasRect = canvasNode.getBoundingClientRect()
    const ctx = canvasNode.getContext('2d')
    const point = {
      x: evt.clientX - canvasRect.left,
      y: evt.clientY - canvasRect.top,
    }
    utils.canvas.clearRect(ctx, this.props.size)
    ctx.lineWidth = 20
    const check1 = R.any(d => {
      if (ctx.isPointInPath(d.path2D, point.x, point.y)) {
        ctx.fillStyle = 'red'
        ctx.fill(d.path2D)
        return true
      }
    }, this.props.renderData)
    if (!check1) {
      R.any(d => {
        if (ctx.isPointInStroke(d.path2D, point.x, point.y)) {
          ctx.fillStyle = 'red'
          ctx.fill(d.path2D)
          return true
        }
      }, this.props.renderData)
    }
  },
  renderCanvas() {
    var ctx = findDOMNode(this.refs.canvas).getContext('2d')
    ctx.fillStyle = 'hsl(0, 50%, 20%)'
    utils.canvas.clearRect(ctx, this.props.size)
  },
  render() {
    return (
      <div>
        <canvas
            onMouseMove={this.onMouseMove}
            style={styles.canvas}
            height={this.props.size.height}
            ref='canvas'
            width={this.props.size.width}
            />
        {this.state.tooltipShow &&
          <div style={styles.tooltip}>
            Tooltip
          </div>
        }
      </div>
    )
  },
})
