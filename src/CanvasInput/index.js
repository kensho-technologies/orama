
import React, {PropTypes} from 'react'
import {getDataUnderMouse} from './getDataUnderMouse'

import {TooltipWrapper} from '../TooltipWrapper'

const runHoverSolverOn = dataUnderMouse => {
  const {
    layerProps,
    renderDatum,
    data,
    localMouse,
  } = dataUnderMouse
  if (!renderDatum || !layerProps) return dataUnderMouse
  const hoverSolver = layerProps.hoverSolver || renderDatum.hoverSolver
  if (!hoverSolver) return dataUnderMouse
  const hoverSolverData = hoverSolver(
    layerProps, data, renderDatum, localMouse,
  )
  return {
    ...dataUnderMouse,
    ...hoverSolverData,
  }
}

/*
Usually used inside of <ChartRender/>
Get hovered and clicked data on renderData using a <canvas/> element
*/
export const CanvasInput = React.createClass({
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
  handleCanvasRef(canvasNode) {
    this.canvasNode = canvasNode
  },
  handleMouseMove(evt) {
    const {props} = this
    const {
      hoverData,
      hoverRenderData,
      mouse,
      layerProps,
    } = runHoverSolverOn(getDataUnderMouse(props, evt, this.canvasNode))
    props.onUpdate({
      ...props,
      hoverRenderData,
    })
    this.setState({
      mouse,
      hoverData,
      layerProps,
    })
  },
  handleMouseLeave() {
    this.props.onUpdate({
      ...this.props,
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
          // onClick={evt => handleClick(props, evt)}
          height={props.size.height}
          onMouseLeave={this.handleMouseLeave}
          onMouseMove={this.handleMouseMove}
          ref={this.handleCanvasRef}
          style={{
            display: 'block',
            position: 'absolute',
            cursor: 'pointer',
            userSelect: 'none',
          }}
          width={props.size.width}
        />
        {state.mouse && state.hoverData ?
          <TooltipWrapper
            hoverData={state.hoverData}
            layerProps={state.layerProps}
            mouse={state.mouse}
          />
        : null}
      </div>
    )
  },
})
