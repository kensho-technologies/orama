// Copyright 2018 Kensho Technologies, LLC.

import * as React from 'react'
import PropTypes from 'prop-types'

import hoverRender from '../CanvasRender/hoverRender'
import {TooltipWrapper} from '../TooltipWrapper'
import CanvasRender from '../CanvasRender'

import {getDataUnderMouse} from './getDataUnderMouse'
import {getMouseFromEvt, runHoverSolverOn} from './methods'

/*
Usually used inside of <ChartRender/>
Get hovered and clicked data on renderData using a <canvas/> element
*/
export default class CanvasInput extends React.Component {
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

  componentWillReceiveProps(nextProps) {
    if (this.state.mouse && !this.mouseLeave) {
      const solvedData = runHoverSolverOn(
        getDataUnderMouse(nextProps, this.state.mouse, this.canvasNode)
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

  componentDidUpdate(prevProps, prevState) {
    if (this.state.mouseDrag && !prevState.mouseDrag) {
      document.addEventListener('mouseup', this.handleMouseUp)
    } else if (!this.state.mouseDrag && prevState.mouseDrag) {
      document.removeEventListener('mouseup', this.handleMouseUp)
    }
  }

  handleCanvasRef = canvasNode => {
    this.canvasNode = canvasNode
  }

  handleClick = evt => {
    evt.stopPropagation()
    evt.preventDefault()
    if (!this.state.mouseDrag) {
      const mouse = getMouseFromEvt(evt)
      const solvedData = runHoverSolverOn(getDataUnderMouse(this.props, mouse, this.canvasNode))
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
    this.setState({mouseDrag: false})
  }

  handleDoubleClick = () => {
    this.props.onUpdate({
      action: 'mouseDoubleClick',
    })
  }

  handleMouseDown = evt => {
    const mouse = getMouseFromEvt(evt)
    const solvedData = runHoverSolverOn(getDataUnderMouse(this.props, mouse, this.canvasNode))
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

  handleMouseMove = evt => {
    const mouse = getMouseFromEvt(evt)
    const solvedData = runHoverSolverOn(getDataUnderMouse(this.props, mouse, this.canvasNode))
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
    this.setState(prevState => ({
      mouseDrag: !!prevState.mouseDown,
      mouse,
      hoverRenderData: solvedData.hoverRenderData,
      hoverData: solvedData.hoverData,
      layerProps: solvedData.layerProps,
    }))
    this.lastMouse = mouse
    this.mouseLeave = false
  }

  handleMouseUp = evt => {
    evt.stopPropagation()
    evt.preventDefault()
    const mouse = getMouseFromEvt(evt)
    const solvedData = runHoverSolverOn(getDataUnderMouse(this.props, mouse, this.canvasNode, evt))
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
    const {rootProps, theme} = this.props
    const {hoverRenderData, hoverData, layerProps, mouse} = this.state
    return (
      <div>
        <CanvasRender // hoverRender
          clip
          height={rootProps.height}
          plotRect={rootProps.plotRect}
          render={hoverRender}
          renderData={hoverRenderData}
          theme={theme}
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
        {mouse && hoverData ? (
          <TooltipWrapper
            hoverData={hoverData}
            layerProps={layerProps}
            mouse={mouse}
            theme={theme}
          />
        ) : null}
      </div>
    )
  }
}
