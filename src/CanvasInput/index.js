
import React, {PropTypes} from 'react'

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

const getMouseFromEvt = evt => {
  if (evt.touches) {
    return {
      x: evt.touches[0].clientX,
      y: evt.touches[0].clientY,
    }
  }
  return {
    x: evt.clientX,
    y: evt.clientY,
  }
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
    if (this.state.mouseDrag && !state.mouseDrag) {
      document.addEventListener('mouseup', this.onMouseUp)
    } else if (!this.state.mouseDrag && state.mouseDrag) {
      document.removeEventListener('mouseup', this.onMouseUp)
    }
  },
  handleCanvasRef(canvasNode) {
    this.canvasNode = canvasNode
  },
  handleClick(evt) {
    evt.stopPropagation()
    evt.preventDefault()
    this.props.onUpdate({
      action: 'mouseClick',
    })
  },
  handleDoubleClick() {
    this.props.onUpdate({
      action: 'mouseDoubleClick',
    })
  },
  handleMouseDown(evt) {
    const mouse = getMouseFromEvt(evt)
    const solvedData = runHoverSolverOn(
      getDataUnderMouse(this.props, mouse, this.canvasNode, evt)
    )
    this.props.onUpdate({
      action: 'mouseDown',
      mouse,
      renderDatum: solvedData.renderDatum,
      hoverRenderData: solvedData.hoverRenderData,
      hoverData: solvedData.hoverData,
      localMouse: solvedData.hoverData,
    })
    this.setState({
      mouseDrag: true,
      mouse,
      hoverData: solvedData.hoverData,
      layerProps: solvedData.layerProps,
    })
    this.lastMouse = mouse
  },
  handleMouseMove(evt) {
    const mouse = getMouseFromEvt(evt)
    const solvedData = runHoverSolverOn(
      getDataUnderMouse(this.props, mouse, this.canvasNode, evt)
    )
    let mouseDelta
    if (this.lastMouse) {
      mouseDelta = {
        x: this.lastMouse.x - mouse.x,
        y: this.lastMouse.y - mouse.y,
      }
    }
    this.props.onUpdate({
      action: this.state.mouseDrag ? 'mouseDrag' : 'mouseMove',
      mouse,
      mouseDelta,
      renderDatum: solvedData.renderDatum,
      hoverRenderData: solvedData.hoverRenderData,
      hoverData: solvedData.hoverData,
      localMouse: solvedData.hoverData,
    })
    this.setState({
      mouse,
      hoverData: solvedData.hoverData,
      layerProps: solvedData.layerProps,
    })
    this.lastMouse = mouse
  },
  handleMouseUp(evt) {
    evt.stopPropagation()
    evt.preventDefault()
    this.props.onUpdate({
      action: 'mouseUp',
    })
    this.setState({mouseDrag: false})
  },
  handleMouseLeave() {
    this.props.onUpdate({
      action: 'mouseLeave',
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
          onTouchEnd={this.handleMouseLeave}
          onTouchMove={this.handleMouseMove}
          onTouchStart={this.handleMouseDown}
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
