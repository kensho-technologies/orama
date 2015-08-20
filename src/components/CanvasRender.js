
import React, {findDOMNode, PropTypes} from 'react'

import R from 'ramda'

import utils from '../utils/utils'

export default React.createClass({
  displayName: 'CanvasRender',
  propTypes: {
    plotRect: PropTypes.object,
    size: PropTypes.object,
  },
  getDefaultProps() {
    return {
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

    R.map(typeGroup => {
      const points = R.map(pointD => {
        return {
          x: this.props.xMap(pointD),
          y: this.props.yMap(pointD),
          raw: pointD,
        }
      }, typeGroup.values)
      return points
    }, this.props.renderData)
  },
  render() {
    return (
      <canvas
          height={this.props.size.height}
          ref='canvas'
          width={this.props.size.width}
          />
    )
  },
})
