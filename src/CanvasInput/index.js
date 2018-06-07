// Copyright 2018 Kensho Technologies, LLC.

import * as React from 'react'
import PropTypes from 'prop-types'

import * as CustomPropTypes from '../CustomPropTypes'
import Canvas from '../canvas/Canvas'
import hoverRender from '../canvas/hoverRender'
import TooltipWrapper from '../tooltips/TooltipWrapper'

import getDataUnderMouse from './getDataUnderMouse'
import runHoverSolverOn from './runHoverSolverOn'

export function getMouseFromEvent(event) {
  const {clientX, clientY} = event.touches ? event.touches[0] : event
  return {x: clientX, y: clientY}
}

/*
Usually used inside of <ChartRender />
Get hovered and clicked data on renderData using a <canvas /> element
*/
export default class CanvasInput extends React.Component {
  static propTypes = {
    onUpdate: PropTypes.func.isRequired,
    renderLayers: PropTypes.arrayOf(PropTypes.object),
    rootProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    theme: CustomPropTypes.theme,
  }

  static defaultProps = {
    renderLayers: [],
  }

  canvasRef = React.createRef()

  state = {
    mouse: null,
    hoverRenderData: null,
    hoverData: null,
    layerProps: null,
    mouseLeave: false,
  }

  componentWillReceiveProps(nextProps) {
    this.setState(prevState => {
      if (!prevState.mouse || prevState.mouseLeave) return null
      const solvedData = runHoverSolverOn(
        getDataUnderMouse(nextProps, prevState.mouse, this.canvasRef.current)
      )
      return {...solvedData}
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.mouseDrag && !prevState.mouseDrag) {
      document.addEventListener('mouseup', this.handleMouseUp)
    } else if (!this.state.mouseDrag && prevState.mouseDrag) {
      document.removeEventListener('mouseup', this.handleMouseUp)
    }
  }

  handleClick = event => {
    event.stopPropagation()
    event.preventDefault()
    if (!this.state.mouseDrag) {
      const mouse = getMouseFromEvent(event)
      const solvedData = runHoverSolverOn(
        getDataUnderMouse(this.props, mouse, this.canvasRef.current)
      )
      this.props.onUpdate({
        action: 'mouseClick',
        mouse,
        ...solvedData,
        rootProps: this.props.rootProps,
      })
    }
    this.setState({mouseDrag: false})
  }

  handleDoubleClick = () => {
    this.props.onUpdate({action: 'mouseDoubleClick'})
  }

  handleMouseDown = event => {
    const mouse = getMouseFromEvent(event)
    const solvedData = runHoverSolverOn(
      getDataUnderMouse(this.props, mouse, this.canvasRef.current)
    )
    this.props.onUpdate({
      action: 'mouseDown',
      mouse,
      ...solvedData,
      rootProps: this.props.rootProps,
    })
    this.setState({
      mouseDown: true,
      mouse,
      hoverRenderData: solvedData.hoverRenderData,
      hoverData: solvedData.hoverData,
      layerProps: solvedData.layerProps,
    })
  }

  handleMouseMove = event => {
    const mouse = getMouseFromEvent(event)
    const solvedData = runHoverSolverOn(
      getDataUnderMouse(this.props, mouse, this.canvasRef.current)
    )
    this.setState(
      prevState => {
        const mouseDelta = prevState.mouse
          ? {x: prevState.mouse.x - mouse.x, y: prevState.mouse.y - mouse.y}
          : {x: 0, y: 0}
        return {
          mouseDrag: !!prevState.mouseDown,
          mouse,
          mouseDelta,
          hoverRenderData: solvedData.hoverRenderData,
          hoverData: solvedData.hoverData,
          layerProps: solvedData.layerProps,
          mouseLeave: false,
        }
      },
      () => {
        this.props.onUpdate({
          action: this.state.mouseDrag ? 'mouseDrag' : 'mouseMove',
          mouse,
          mouseDelta: this.state.mouseDelta,
          ...solvedData,
          rootProps: this.props.rootProps,
        })
      }
    )
  }

  handleMouseUp = event => {
    event.stopPropagation()
    event.preventDefault()
    const mouse = getMouseFromEvent(event)
    const solvedData = runHoverSolverOn(
      getDataUnderMouse(this.props, mouse, this.canvasRef.current, event)
    )
    this.props.onUpdate({
      action: 'mouseUp',
      mouse,
      ...solvedData,
      rootProps: this.props.rootProps,
    })
    this.setState({
      mouseDrag: false,
      mouseDown: false,
    })
  }

  handleMouseLeave = () => {
    this.props.onUpdate({action: 'mouseLeave'})
    this.setState({
      mouse: null,
      hoverRenderData: null,
      hoverData: null,
      layerProps: null,
      mouseLeave: true,
    })
  }

  render() {
    const {rootProps, theme} = this.props
    const {hoverRenderData, hoverData, layerProps, mouse} = this.state
    return (
      <React.Fragment>
        <Canvas
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
          ref={this.canvasRef}
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
      </React.Fragment>
    )
  }
}
