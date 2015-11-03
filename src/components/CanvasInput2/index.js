
import React, {PropTypes} from 'react'
import _ from 'lodash'

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
const getDataUnderMouse = (props, canvasNode, evt) => {
  const canvasRect = canvasNode.getBoundingClientRect()
  const ctx = canvasNode.getContext('2d')
  const mouse = {
    x: evt.clientX - canvasRect.left,
    y: evt.clientY - canvasRect.top,
  }
  const inPathData = _.find(props.renderData, d => ctx.isPointInPath(d.path2D, mouse.x, mouse.y))
  if (inPathData) {
    return {
      data: inPathData,
      mouse: {x: evt.clientX, y: evt.clientY},
    }
  }
  ctx.lineWidth = 20
  const inStrokeData = _.find(props.renderData, d => ctx.isPointInStroke(d.path2D, mouse.x, mouse.y))
  if (inStrokeData) {
    return {
      data: inStrokeData,
      mouse: {x: evt.clientX, y: evt.clientY},
    }
  }
  return {
    data: undefined,
    mouse: undefined,
  }
}

/*
Usually used inside of <ChartRender/>
Get hovered and clicked data on renderData using a <canvas/> element
*/
export default React.createClass({
  displayName: 'CanvasInput',
  propTypes: {
    onUpdate: PropTypes.func.isRequired,
    renderData: PropTypes.array,
    size: PropTypes.object.isRequired,
    theme: PropTypes.object,
  },
  updateOnlyTypes: {
    dataClicked: PropTypes.object,
    dataHovered: PropTypes.object,
  },
  canUpdate: ['dataClicked', 'dataHovered'],
  getDefaultProps() {
    return {
      renderData: [],
    }
  },
  getInitialState() {
    return {}
  },
  shouldComponentUpdate: shouldPureComponentUpdate,
  handleMouseMove(evt) {
    const canvasNode = this.refs.canvas
    const {data, mouse} = getDataUnderMouse(this.props, canvasNode, evt)
    this.props.onUpdate({
      ...this.props,
      dataHovered: data,
      mouse,
    })
  },
  handleClick(evt) {
    const canvasNode = this.refs.canvas
    const {data, mouse} = getDataUnderMouse(this.props, canvasNode, evt)
    this.props.onUpdate({
      ...this.props,
      dataClicked: data,
      mouse,
    })
  },
  handleMouseLeave() {
    this.props.onUpdate({
      ...this.props,
      dataHovered: null,
    })
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
