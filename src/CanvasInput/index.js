
import React, {PropTypes} from 'react'
import _ from 'lodash'

const findInPathDataForValues = (ctx, localMouse, renderData) => (
  _.find(
    renderData,
    d => {
      if (d.type === 'area') {
        return ctx.isPointInPath(d.path2D, localMouse.x, localMouse.y) || ctx.isPointInStroke(d.path2D, localMouse.x, localMouse.y)
      }
      if (d.type === 'line') return ctx.isPointInStroke(d.path2D, localMouse.x, localMouse.y)
      return false
    }
  )
)
const findInPathData = (ctx, localMouse, reversedLayers) => {
  let inPathData
  const inPathLayer = _.find(
    reversedLayers,
    layer => {
      inPathData = findInPathDataForValues(ctx, localMouse, layer.renderData)
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
const findInStrokeDataForValues = (ctx, localMouse, renderData) => (
  _.find(
    renderData,
    d => ctx.isPointInStroke(d.path2D, localMouse.x, localMouse.y)
  )
)
const findInStrokeData = (ctx, localMouse, reversedLayers) => {
  let inPathData
  const inPathLayer = _.find(
    reversedLayers,
    layer => {
      inPathData = findInStrokeDataForValues(ctx, localMouse, layer.renderData)
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
    reversedLayers,
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
  const inPathData = findInPathData(ctx, localMouse, reversedLayers)
  if (inPathData) {
    return {
      data: inPathData.data,
      mouse,
      localMouse,
    }
  }
  ctx.lineWidth = 20
  const inStrokeData = findInStrokeData(ctx, localMouse, reversedLayers)
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
    renderLayers: PropTypes.array,
    size: PropTypes.object.isRequired,
    theme: PropTypes.object,
  },
  getDefaultProps() {
    return {
      renderLayers: [],
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
    this.reversedLayers = _.clone(this.props.renderLayers)
    this.reversedLayers.reverse()
    _.each(
      this.reversedLayers,
      d => {
        if (d && d.renderData) d.renderData.reverse()
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
