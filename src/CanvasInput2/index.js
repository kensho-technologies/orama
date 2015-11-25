
import React, {PropTypes} from 'react'
import _ from 'lodash'

/*
This component will be deprecated when work on Chart2 is finished
*/

/**
 * Find on the render data the geom that intersect whith the mouse position.
 */
const getDataUnderMouse = (that, canvasNode, evt) => {
  const {
    reversedData,
  } = that
  const canvasRect = canvasNode.getBoundingClientRect()
  const ctx = canvasNode.getContext('2d')
  ctx.save()
  const mouse = {
    x: evt.clientX,
    y: evt.clientY,
  }
  const localMouse = {
    x: evt.clientX - canvasRect.left,
    y: evt.clientY - canvasRect.top,
  }
  ctx.lineWidth = 2
  const inPathData = _.find(
    reversedData,
    d => {
      if (d.type === 'area') {
        return ctx.isPointInPath(d.path2D, localMouse.x, localMouse.y) || ctx.isPointInStroke(d.path2D, localMouse.x, localMouse.y)
      }
      if (d.type === 'line') return ctx.isPointInStroke(d.path2D, localMouse.x, localMouse.y)
      return false
    }
  )
  if (inPathData) {
    return {
      data: inPathData,
      mouse,
      localMouse,
    }
  }
  ctx.lineWidth = 20
  const inStrokeData = _.find(
    reversedData,
    d => ctx.isPointInStroke(d.path2D, localMouse.x, localMouse.y)
  )
  if (inStrokeData) {
    return {
      data: inStrokeData,
      mouse,
      localMouse,
    }
  }
  ctx.restore()
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
    this.props.onUpdate({
      ...this.props,
      hoverDatum: data,
      localMouse,
      mouse,
    })
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
      hoverDatum: data,
      localMouse,
      mouse,
    })
  },
  render() {
    this.reversedData = _.clone(this.props.renderData)
    this.reversedData.reverse()
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
