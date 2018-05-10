// Copyright 2018 Kensho Technologies, LLC.

import * as React from 'react'
import PropTypes from 'prop-types'

import {getDataUnderMouse} from '../CanvasInput/getDataUnderMouse'
import {getMouseFromEvt} from '../CanvasInput/methods'
import {hoverRender} from '../CanvasRender/hoverRender'
import {runHoverSolverOn} from '../CanvasInput/methods'
import {TooltipWrapper} from '../TooltipWrapper'

import {CanvasRender} from '../CanvasRender'

/*
Usually used inside of <ChartRender/>
Get hovered and clicked data on renderData using a <canvas/> element
*/
export class CanvasInput extends React.Component {
  static propTypes = {
    onUpdate: PropTypes.func.isRequired,
    renderLayers: PropTypes.array,
    rootProps: PropTypes.object,
    theme: PropTypes.object,
  }
  static defaultProps = {
    renderLayers: [],
  }
  state = {}
  componentWillReceiveProps = (props) => {
    if (this.state.mouse && !this.mouseLeave) {
      const solvedData = runHoverSolverOn(
        getDataUnderMouse(props, this.state.mouse, this.canvasNode)
      )
      this.setState({
        renderDatum: solvedData.renderDatum,
        hoverRenderData: solvedData.hoverRenderData,
        hoverData: solvedData.hoverData,
        localMouse: solvedData.localMouse,
        layerProps: solvedData.layerProps,
      })
    }
  }
  componentDidUpdate = (props, state) => {
    if (this.state.mouseDrag && !state.mouseDrag) {
      document.addEventListener('mouseup', this.handleMouseUp)
    } else if (!this.state.mouseDrag && state.mouseDrag) {
      document.removeEventListener('mouseup', this.handleMouseUp)
    }
  }
  handleCanvasRef = (canvasNode) => {
    this.canvasNode = canvasNode
  }
  handleClick = (evt) => {
    evt.stopPropagation()
    evt.preventDefault()
    if (!this.state.mouseDrag) {
      const mouse = getMouseFromEvt(evt)
      const solvedData = runHoverSolverOn(
        getDataUnderMouse(this.props, mouse, this.canvasNode)
      )
      this.props.onUpdate({
        action: 'mouseClick',
        mouse,
        renderDatum: solvedData.renderDatum,
        hoverRenderData: solvedData.hoverRenderData,
        hoverData: solvedData.hoverData,
        localMouse: solvedData.localMouse,
        layerProps: solvedData.layerProps,
        rootProps: this.props.rootProps,
      })
    }
    this.setState({
      mouseDrag: false,
    })
  }
  handleDoubleClick = () => {
    this.props.onUpdate({
      action: 'mouseDoubleClick',
    })
  }
  handleMouseDown = (evt) => {
    const mouse = getMouseFromEvt(evt)
    const solvedData = runHoverSolverOn(
      getDataUnderMouse(this.props, mouse, this.canvasNode)
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
      mouseDown: true,
      mouse,
      hoverRenderData: solvedData.hoverRenderData,
      hoverData: solvedData.hoverData,
      layerProps: solvedData.layerProps,
    })
    this.lastMouse = mouse
  }
  handleMouseMove = (evt) => {
    const mouse = getMouseFromEvt(evt)
    const solvedData = runHoverSolverOn(
      getDataUnderMouse(this.props, mouse, this.canvasNode)
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
      mouseDrag: this.state.mouseDown ? true : false,
      mouse,
      hoverRenderData: solvedData.hoverRenderData,
      hoverData: solvedData.hoverData,
      layerProps: solvedData.layerProps,
    })
    this.lastMouse = mouse
    this.mouseLeave = false
  }
  handleMouseUp = (evt) => {
    evt.stopPropagation()
    evt.preventDefault()
    const mouse = getMouseFromEvt(evt)
    const solvedData = runHoverSolverOn(
      getDataUnderMouse(this.props, mouse, this.canvasNode, evt)
    )
    this.props.onUpdate({
      action: 'mouseUp',
      mouse,
      renderDatum: solvedData.renderDatum,
      hoverRenderData: solvedData.hoverRenderData,
      hoverData: solvedData.hoverData,
      localMouse: solvedData.localMouse,
      layerProps: solvedData.layerProps,
      rootProps: this.props.rootProps,
    })
    this.setState({
      mouseDrag: false,
      mouseDown: false,
    })
  }
  handleMouseLeave = () => {
    this.props.onUpdate({
      action: 'mouseLeave',
    })
    this.setState({
      mouse: undefined,
      hoverRenderData: undefined,
      hoverData: undefined,
      layerProps: undefined,
    })
    this.mouseLeave = true
  }
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
            width: rootProps.width,
            height: rootProps.height,
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
  }
}
