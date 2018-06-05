// Copyright 2018 Kensho Technologies, LLC.

import {findLast} from 'lodash'

export function findFirstPass(ctx, localMouse, renderData) {
  const {x, y} = localMouse
  ctx.lineJoin = 'round'
  return findLast(renderData, d => {
    if (!d) return false
    if (d.showHover === false) return false
    if (d.hover1stPath2D) return ctx.isPointInPath(d.hover1stPath2D, x, y)
    if (d.type === 'text') return false
    if (d.type === 'area') return ctx.isPointInPath(d.path2D, x, y)
    if (d.type === 'line') return ctx.isPointInStroke(d.path2D, x, y)
    return false
  })
}

export function findSecondPass(ctx, localMouse, renderData) {
  const {x, y} = localMouse
  ctx.lineJoin = 'round'
  return findLast(renderData, d => {
    if (!d) return false
    if (d.showHover === false) return false
    if (d.hover2ndPath2D) return ctx.isPointInPath(d.hover2ndPath2D, x, y)
    if (d.type === 'text') return false
    return ctx.isPointInStroke(d.path2D, x, y)
  })
}

export function findInRenderLayers(ctx, localMouse, renderLayers, findFunc) {
  let renderDatum
  const layer = findLast(renderLayers, _layer => {
    if (_layer.layerProps.showHover === false) return false
    renderDatum = findFunc(ctx, localMouse, _layer.renderData)
    return renderDatum
  })
  if (!layer) return undefined
  return {
    renderDatum,
    hoverRenderData: [renderDatum],
    hoverData: renderDatum.data,
    layerProps: layer.layerProps,
  }
}

// format return for getDataUnderMouse
const formatReturnData = (foundData, localMouse) => ({
  layerProps: foundData.layerProps,
  renderDatum: foundData.renderDatum,
  hoverRenderData: foundData.hoverRenderData,
  hoverData: foundData.hoverData,
  localMouse,
})

// find on the render data the geom that intersects with the mouse position
export default function getDataUnderMouse(props, mouse, canvasNode) {
  if (!canvasNode) return {}
  const {renderLayers} = props

  const canvasRect = canvasNode.getBoundingClientRect()
  const ctx = canvasNode.getContext('2d')
  const localMouse = {
    x: mouse.x - canvasRect.left,
    y: mouse.y - canvasRect.top,
  }

  ctx.lineWidth = 10
  const inPathData = findInRenderLayers(ctx, localMouse, renderLayers, findFirstPass)
  if (inPathData) return formatReturnData(inPathData, localMouse)
  ctx.lineWidth = 18
  const inStrokeData = findInRenderLayers(ctx, localMouse, renderLayers, findSecondPass)
  if (inStrokeData) return formatReturnData(inStrokeData, localMouse)
  return {localMouse}
}
