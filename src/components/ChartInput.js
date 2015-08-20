
import React, {findDOMNode, PropTypes} from 'react'
import R from 'ramda'

import utils from '../utils/utils'

const styles = {
  tooltip: {
    position: 'absolute',
    pointerEvents: 'none',
    background: 'lightgray',
    padding: 10,
    border: '1px solid black',
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
    const mouse = {
      x: evt.clientX - canvasRect.left,
      y: evt.clientY - canvasRect.top,
    }
    utils.canvas.clearRect(ctx, this.props.size)
    ctx.lineWidth = 20
    const pathCheck = R.any(d => {
      if (ctx.isPointInPath(d.path2D, mouse.x, mouse.y)) {
        this.setState({
          hoverData: d,
          mouse,
        })
        return true
      }
    }, this.props.renderData)
    if (pathCheck) return
    const strokeCheck = R.any(d => {
      if (ctx.isPointInStroke(d.path2D, mouse.x, mouse.y)) {
        this.setState({
          hoverData: d,
          mouse,
        })
        return true
      }
    }, this.props.renderData)
    if (!strokeCheck && this.state.hoverData) {
      this.setState({hoverData: undefined})
    }
  },
  onMouseLeave() {
    this.setState({hoverData: undefined})
  },
  renderCanvas() {
    const {hoverData} = this.state
    var ctx = findDOMNode(this.refs.canvas).getContext('2d')
    ctx.fillStyle = 'hsl(0, 50%, 20%)'
    utils.canvas.clearRect(ctx, this.props.size)
    if (hoverData) {
      ctx.fillStyle = 'red'
      ctx.fill(hoverData.path2D)
    }
  },
  render() {
    return (
      <div>
        <canvas
            height={this.props.size.height}
            onMouseMove={this.onMouseMove}
            onMouseLeave={this.onMouseLeave}
            ref='canvas'
            style={styles.canvas}
            width={this.props.size.width}
            />
        {this.state.hoverData &&
          <div style={R.merge(styles.tooltip, {top: this.state.mouse.y + 20, left: this.state.mouse.x + 20})}>
            Tooltip
          </div>
        }
      </div>
    )
  },
})
