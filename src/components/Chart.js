
import React from 'react'
import R from 'ramda'
import { connect } from 'react-redux'

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

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
function getScales(dimensions, bound) {
  var scales
}

/**
 * Component description
 */
export var Chart = React.createClass({
  displayName: 'Chart',
  propTypes: {
    /**
     * The size of the chart
     */
    dimensions: PropTypes.object,
    margin: PropTypes.object,
    size: PropTypes.object,
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

    getScales(dimensions, size)

    var ctx = findDOMNode(this.refs.canvas).getContext('2d')
    ctx.fillStyle = 'lightgray'
    ctx.strokeStyle = 'black'
    ctx.globalAlpha = 1
    ctx.lineWidth = 2

    ctx.clearRect(0, 0, size.width, size.height)
    ctx.strokeRect(0, 0, size.width, size.height)
    ctx.beginPath()
    ctx.rect(
      margin.left,
      margin.top,
      size.width - margin.left - margin.right,
      size.height - margin.top - margin.bottom
    )
    ctx.closePath()
    ctx.fill()

    ctx.globalAlpha = 0.3
    R.forEach(() => {
      ctx.beginPath()
      ctx.arc(
        randomInt(margin.left, size.width - margin.right),
        randomInt(margin.top, size.height - margin.bottom),
        2, 0, 2 * Math.PI
      )
      ctx.closePath()
      ctx.stroke()
    }, R.range(0, 10000))
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
