
import React, {PropTypes} from 'react'
import R from 'ramda'

import shouldPureComponentUpdate from 'react-pure-render/function'

const styles = {
  canvas: {
    display: 'block',
    position: 'absolute',
    cursor: 'pointer',
    userSelect: 'none',
  },
}

/**
 * Find on the render data the geom that intersect whith the mouse position.
 */
const findGeom = (data, evt, canvasNode, clbck) => {
  const canvasRect = canvasNode.getBoundingClientRect()
  const ctx = canvasNode.getContext('2d')
  const mouse = {
    x: evt.clientX - canvasRect.left,
    y: evt.clientY - canvasRect.top,
  }
  const pathCheck = R.any(d => {
    if (ctx.isPointInPath(d.path2D, mouse.x, mouse.y)) {
      clbck(d, {x: evt.clientX, y: evt.clientY})
      return true
    }
  }, data)
  if (pathCheck) return
  ctx.lineWidth = 20
  const strokeCheck = R.any(d => {
    if (ctx.isPointInStroke(d.path2D, mouse.x, mouse.y)) {
      clbck(d, {x: evt.clientX, y: evt.clientY})
      return true
    }
  }, data)
  if (strokeCheck) return
  clbck()
}

/**
 * Read and executes the inputs from Charts
 */
export default React.createClass({
  displayName: 'CanvasInput',
  propTypes: {
    onClick: PropTypes.func,
    onHover: PropTypes.func,
    renderData: PropTypes.array,
    size: PropTypes.object.isRequired,
    theme: PropTypes.object,
  },
  getDefaultProps() {
    return {
      onClick: () => undefined,
      onHover: () => undefined,
      renderData: [],
    }
  },
  getInitialState() {
    return {}
  },
  shouldComponentUpdate: shouldPureComponentUpdate,
  handleMouseMove(evt) {
    const canvasNode = this.refs.canvas
    findGeom(this.props.renderData, evt, canvasNode, this.props.onHover)
  },
  handleClick(evt) {
    const canvasNode = this.refs.canvas
    findGeom(this.props.renderData, evt, canvasNode, this.props.onClick)
  },
  handleMouseLeave() {
    this.props.onHover()
  },
  render() {
    return (
      <canvas
        height={this.props.size.height}
        onClick={this.handleClick}
        onMouseLeave={this.handleMouseLeave}
        onMouseMove={this.handleMouseMove}
        ref='canvas'
        style={styles.canvas}
        width={this.props.size.width}
      />
    )
  },
})
