
import React, {PropTypes} from 'react'
import _ from 'lodash'

import {getDataUnderMouse} from './getDataUnderMouse'

import {TooltipWrapper} from '../TooltipWrapper'

const runHoverSolverOn = dataUnderMouse => {
  const {
    layerProps,
    renderDatum,
    hoverData,
    localMouse,
    mouse,
  } = dataUnderMouse

  if (!renderDatum || !layerProps) return dataUnderMouse
  const hoverSolver = layerProps.hoverSolver || renderDatum.hoverSolver
  if (!hoverSolver) return dataUnderMouse
  const hoverSolverData = hoverSolver(
    layerProps, hoverData, renderDatum, localMouse,
  )
  return {
    layerProps,
    hoverOriginalData: hoverData,
    hoverRenderData: hoverSolverData.hoverRenderData,
    hoverData: hoverSolverData.hoverData,
    localMouse,
    mouse,
  }
}

const getRootProps = renderLayers => {
  const firstLayer = _.first(renderLayers)
  if (firstLayer) return firstLayer.layerProps
  return {}
}

/*
Usually used inside of <ChartRender/>
Get hovered and clicked data on renderData using a <canvas/> element
*/
export const CanvasInput = React.createClass({
  propTypes: {
    height: PropTypes.number,
    onUpdate: PropTypes.func.isRequired,
    renderLayers: PropTypes.array,
    theme: PropTypes.object,
    width: PropTypes.number,
  },
  getDefaultProps() {
    return {
      renderLayers: [],
    }
  },
  getInitialState() {
    return {}
  },
  componentDidUpdate(props, state) {
    if (this.state.dragging && !state.dragging) {
      document.addEventListener('mouseup', this.onMouseUp)
    } else if (!this.state.dragging && state.dragging) {
      document.removeEventListener('mouseup', this.onMouseUp)
    }
  },
  handleCanvasRef(canvasNode) {
    this.canvasNode = canvasNode
  },
  handleClick() {
  },
  handleDoubleClick() {
  },
  handleMouseDown(evt) {
    evt.stopPropagation()
    evt.preventDefault()
    const solvedData = runHoverSolverOn(
      getDataUnderMouse(this.props, evt, this.canvasNode)
    )
    this.props.onUpdate({
      rootProps: getRootProps(this.props.renderLayers),
      isMouseDown: true,
      hoverRenderData: solvedData.hoverRenderData,
      mouseDownOriginalData: solvedData.hoverOriginalData,
      mouseDownData: solvedData.hoverData,
      mouseDownLocalMouse: solvedData.localMouse,
      mouseDownMouse: solvedData.mouse,
    })
    this.setState({
      dragging: true,
    })
    this.lastMouse = {x: evt.clientX, y: evt.clientY}
  },
  handleMouseMove(evt) {
    evt.stopPropagation()
    evt.preventDefault()
    const solvedData = runHoverSolverOn(
      getDataUnderMouse(this.props, evt, this.canvasNode)
    )
    let hoverMouseDelta
    if (this.lastMouse) {
      hoverMouseDelta = {
        x: this.lastMouse.x - evt.clientX,
        y: this.lastMouse.y - evt.clientY,
      }
    }
    this.props.onUpdate({
      rootProps: getRootProps(this.props.renderLayers),
      isDragging: this.state.dragging,
      hoverRenderData: solvedData.hoverRenderData,
      hoverOriginalData: solvedData.hoverOriginalData,
      hoverData: solvedData.hoverData,
      hoverLocalMouse: solvedData.localMouse,
      hoverMouse: solvedData.mouse,
      hoverMouseDelta,
    })
    this.setState({
      mouse: solvedData.mouse,
      hoverData: solvedData.hoverData,
      layerProps: solvedData.layerProps,
    })
    this.lastMouse = {x: evt.clientX, y: evt.clientY}
  },
  handleMouseUp(evt) {
    evt.stopPropagation()
    evt.preventDefault()
    this.props.onUpdate({
      rootProps: getRootProps(this.props.renderLayers),
      isDragging: false,
      isMouseDown: false,
    })
    this.setState({dragging: false})
  },
  handleMouseLeave() {
    this.props.onUpdate({
      rootProps: getRootProps(this.props.renderLayers),
      hoverRenderData: undefined,
    })
    this.setState({
      mouse: undefined,
      hoverData: undefined,
      layerProps: undefined,
    })
  },
  render() {
    const {props, state} = this
    return (
      <div>
        <canvas
          height={props.height}
          onClick={this.handleClick}
          onDoubleClick={this.handleDoubleClick}
          onMouseDown={this.handleMouseDown}
          onMouseLeave={this.handleMouseLeave}
          onMouseMove={this.handleMouseMove}
          onMouseUp={this.handleMouseUp}
          ref={this.handleCanvasRef}
          style={{
            cursor: 'pointer',
            display: 'block',
            position: 'absolute',
            userSelect: 'none',
            width: '100%',
          }}
          width={props.width}
        />
        {state.mouse && state.hoverData ?
          <TooltipWrapper
            hoverData={state.hoverData}
            layerProps={state.layerProps}
            mouse={state.mouse}
            theme={props.theme}
          />
        : null}
      </div>
    )
  },
})
