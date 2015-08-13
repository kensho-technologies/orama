
import React from 'react'
import R from 'ramda'
import { connect } from 'react-redux'

import * as rectUtils from '../utils/rectUtils'
import * as canvasUtils from '../utils/canvasUtils'
import * as dimUtils from '../utils/dimensionUtils'
import * as dataMapUtils from '../utils/dataMapUtils'

var {findDOMNode, PropTypes} = React

var styles = {
  container: {
    position: 'relative',
  },
  canvas: {
    display: 'block',
  },
  label: {
    position: 'absolute',
    transform: 'rotate(-90deg) translateY(100%)',
    bottom: 30,
    left: 10,
    width: 400 - 60,
    fontSize: 16,
    textAlign: 'center',
    transformOrigin: 'left bottom',
  },
}

/**
 * Component description
 */
export var Chart = React.createClass({
  displayName: 'Chart',
  propTypes: {
    data: PropTypes.array.isRequired,
    dimensions: PropTypes.object.isRequired,
    margin: PropTypes.object.isRequired,
    size: PropTypes.object.isRequired,
  },
  getDefaultProps() {
    return {
      size: {
        width: 600,
        height: 400,
      },
      margin: {
        left: 80, right: 20,
        top: 20, bottom: 50,
      },
      data: [],
    }
  },
  componentDidMount() {
    this.canvasRender()
  },
  componentDidUpdate() {
    this.canvasRender()
  },
  canvasRender() {
    var {
      data,
      dimensions,
      margin,
      size,
    } = this.props

    const plotRect = rectUtils.marginInset(margin, size)
    const expandedDim = R.pipe(
      dimUtils.mergeDomains(data),
      dimUtils.mergeRanges(plotRect),
      dimUtils.mergeScales
    )(dimensions)

    const mappedData = dataMapUtils.mapToPoints(expandedDim, data)

    var ctx = findDOMNode(this.refs.canvas).getContext('2d')
    ctx.fillStyle = 'lightgray'
    ctx.strokeStyle = 'black'
    ctx.globalAlpha = 1
    ctx.lineWidth = 2

    canvasUtils.clearRect(ctx, size)
    canvasUtils.strokeRect(ctx, size)
    canvasUtils.fillRect(ctx, rectUtils.inset(-10, plotRect))

    ctx.globalAlpha = 0.8
    R.forEach(d => {
      ctx.fillStyle = d.color || 'black'
      ctx.fill(d.path2D)
    }, mappedData)
  },
  render() {
    return (
      <div style={styles.container}>
        <div style={styles.label}>
          Axis Label
        </div>
        <canvas
            height={this.props.size.height}
            ref='canvas'
            style={styles.canvas}
            width={this.props.size.width}
            />
      </div>
    )
  },
})

export default connect(state => state)(Chart)
