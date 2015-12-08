
import React, {PropTypes} from 'react'
import _ from 'lodash'

const findInPathDataForValues = (ctx, localMouse, values) => (
  _.find(
    values,
    d => {
      if (d.type === 'area') {
        return ctx.isPointInPath(d.path2D, localMouse.x, localMouse.y) || ctx.isPointInStroke(d.path2D, localMouse.x, localMouse.y)
      }
      if (d.type === 'line') return ctx.isPointInStroke(d.path2D, localMouse.x, localMouse.y)
      return false
    }
  )
)
const findInPathData = (ctx, localMouse, reversedData) => {
  let inPathData
  const inPathLayer = _.find(
    reversedData,
    layer => {
      inPathData = findInPathDataForValues(ctx, localMouse, layer.values)
      return inPathData
    }
  )
  if (inPathLayer) {
    return {
      data: inPathData,
      layer: inPathLayer,
    }
  }
}
const findInStrokeDataForValues = (ctx, localMouse, values) => (
  _.find(
    values,
    d => ctx.isPointInStroke(d.path2D, localMouse.x, localMouse.y)
  )
)
const findInStrokeData = (ctx, localMouse, reversedData) => {
  let inPathData
  const inPathLayer = _.find(
    reversedData,
    layer => {
      inPathData = findInStrokeDataForValues(ctx, localMouse, layer.values)
      return inPathData
    }
  )
  if (inPathLayer) {
    return {
      data: inPathData,
      layer: inPathLayer,
    }
  }
}

/**
 * Find on the render data the geom that intersect whith the mouse position.
 */
const getDataUnderMouse = (that, canvasNode, evt) => {
  const {
    reversedData,
  } = that
  const canvasRect = canvasNode.getBoundingClientRect()
  const ctx = canvasNode.getContext('2d')
  const mouse = {
    x: evt.clientX,
    y: evt.clientY,
  }
  const localMouse = {
    x: evt.clientX - canvasRect.left,
    y: evt.clientY - canvasRect.top,
  }
  ctx.lineWidth = 2
  const inPathData = findInPathData(ctx, localMouse, reversedData)
  if (inPathData) {
    return {
      data: inPathData.data,
      mouse,
      localMouse,
    }
  }
  ctx.lineWidth = 20
  const inStrokeData = findInStrokeData(ctx, localMouse, reversedData)
  if (inStrokeData) {
    return {
      data: inStrokeData.data,
      mouse,
      localMouse,
    }
  }
  return {
    data: undefined,
    mouse: undefined,
    localMouse: undefined,
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
  getDefaultProps() {
    return {
      renderData: [],
    }
  },
  getInitialState() {
    return {}
  },
  shouldComponentUpdate(nextProps) {
    if (this.props.size === nextProps.size) return false
    return true
  },
  handleMouseMove(evt) {
    const canvasNode = this.refs.canvas
    const {
      data,
      mouse,
      localMouse,
    } = getDataUnderMouse(this, canvasNode, evt)
    if (data && data.hoverSolver) {
      const hoverElements = data.hoverSolver(localMouse)
      this.props.onUpdate({
        ...this.props,
        hoverData: hoverElements.hoverData,
        tooltipData: hoverElements.tooltipData,
        localMouse,
        mouse,
      })
    } else {
      this.props.onUpdate({
        ...this.props,
        hoverData: [data],
        localMouse,
        mouse,
      })
    }
  },
  handleClick(evt) {
    const canvasNode = this.refs.canvas
    const {
      data,
      mouse,
      localMouse,
    } = getDataUnderMouse(this, canvasNode, evt)
    this.props.onUpdate({
      ...this.props,
      dataClicked: data,
      hoverData: [data],
      localMouse,
      mouse,
    })
  },
  render() {
    this.reversedData = _.clone(this.props.renderData)
    this.reversedData.reverse()
    _.each(
      this.reversedData,
      d => {
        if (d && d.values) d.values.reverse()
      },
    )
    return (
      <canvas
        height={this.props.size.height}
        onClick={this.handleClick}
        onMouseMove={this.handleMouseMove}
        ref='canvas'
        style={{
          display: 'block',
          position: 'absolute',
          cursor: 'pointer',
          userSelect: 'none',
        }}
        width={this.props.size.width}
      />
    )
  },
})
