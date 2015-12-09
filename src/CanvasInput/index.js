
import React, {PropTypes} from 'react'
import _ from 'lodash'
import {stateHOC} from 'on-update'

import {Tooltip} from '../Tooltip'

const findInPath = (ctx, localMouse, renderData) => (
  _.findLast(
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
const findInStroke = (ctx, localMouse, renderData) => (
  _.findLast(
    renderData,
    d => ctx.isPointInStroke(d.path2D, localMouse.x, localMouse.y)
  )
)
const findInRenderLayers = ({ctx, localMouse, renderLayers, findFunc}) => {
  let renderDatum
  const layer = _.findLast(
    renderLayers,
    _layer => {
      renderDatum = findFunc(ctx, localMouse, _layer.renderData)
      return renderDatum
    }
  )
  if (layer) {
    return {
      renderDatum,
      layer,
    }
  }
}
/**
 * Find on the render data the geom that intersect whith the mouse position.
 */
const getDataUnderMouse = (props, evt) => {
  const {
    renderLayers,
    canvasNode,
  } = props

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
  const inPathData = findInRenderLayers({
    ctx, localMouse, renderLayers, findFunc: findInPath,
  })
  if (inPathData) {
    return {
      renderDatum: inPathData.renderDatum,
      mouse,
      localMouse,
    }
  }
  ctx.lineWidth = 20
  const inStrokeData = findInRenderLayers({
    ctx, localMouse, renderLayers, findFunc: findInStroke,
  })
  if (inStrokeData) {
    return {
      renderDatum: inStrokeData.renderDatum,
      mouse,
      localMouse,
    }
  }
  return {
    renderDatum: undefined,
    mouse: undefined,
    localMouse: undefined,
  }
}

/*
Usually used inside of <ChartRender/>
Get hovered and clicked data on renderData using a <canvas/> element
*/
const handleCanvasRef = (props, canvasNode) => props.onState({canvasNode})
const handleMouseMove = (props, evt) => {
  const dataUnderMouse = getDataUnderMouse(props, evt)
  props.onUpdate({
    ...props,
    hoverRenderData: [dataUnderMouse.renderDatum],
    // localMouse,
    // mouse,
  })
}
const _CanvasInput = props => (
  <div>
    <canvas
      height={props.size.height}
      // onClick={evt => handleClick(props, evt)}
      onMouseMove={evt => handleMouseMove(props, evt)}
      ref={canvasNode => handleCanvasRef(props, canvasNode)}
      style={{
        display: 'block',
        position: 'absolute',
        cursor: 'pointer',
        userSelect: 'none',
      }}
      width={props.size.width}
    />
    <Tooltip
      // hoverData={state.hoverData}
      // lastMousePos={state.mouse}
      // layerConfig={state.layerConfig}
      // theme={props.theme}
      // tooltipData={state.tooltipData}
    />
  </div>
)
_CanvasInput.propTypes = {
  onUpdate: PropTypes.func.isRequired,
  renderLayers: PropTypes.array,
  size: PropTypes.object.isRequired,
  theme: PropTypes.object,
}
_CanvasInput.defaultProps = {
  renderLayers: [],
}

export default stateHOC(_CanvasInput)
