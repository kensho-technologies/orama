
import React, {PropTypes} from 'react'

import {getDataUnderMouse} from '../CanvasInput/getDataUnderMouse'
import {getMouseFromEvt} from '../CanvasInput/methods'
import {hoverRender} from '../CanvasRender/renders'
import {runHoverSolverOn} from '../CanvasInput/methods'
import {TooltipWrapper} from '../TooltipWrapper'

import {CanvasRender} from '../CanvasRender'

/*
Usually used inside of <ChartRender/>
Get hovered and clicked data on renderData using a <canvas/> element
*/
export const CanvasInput = React.createClass({
  propTypes: {
    onUpdate: PropTypes.func.isRequired,
    renderLayers: PropTypes.array,
    rootProps: PropTypes.object,
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
      localMouse: solvedData.localMouse,
      layerProps: solvedData.layerProps,
      rootProps: this.props.rootProps,
    })
    this.setState({
      mouseDrag: true,
      mouse,
      hoverRenderData: solvedData.hoverRenderData,
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
      localMouse: solvedData.localMouse,
      layerProps: solvedData.layerProps,
      rootProps: this.props.rootProps,
    })
    this.setState({
      mouse,
      hoverRenderData: solvedData.hoverRenderData,
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
      hoverRenderData: undefined,
      hoverData: undefined,
      layerProps: undefined,
    })
  },
  render() {
    const {props, state} = this
    const {rootProps} = props
    return (
      <div>
        <CanvasRender // hoverRender
          clip={true}
          height={rootProps.height}
          plotRect={rootProps.plotRect}
          render={hoverRender}
          renderData={state.hoverRenderData}
          theme={props.theme}
          width={rootProps.width}
        />
        <canvas
          height={rootProps.height}
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
          width={rootProps.width}
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
