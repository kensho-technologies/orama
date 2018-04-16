// Copyright 2017 Kensho Technologies, LLC.

import _ from 'lodash'

export const findFirstPass = (ctx, localMouse, renderData) => (
  _.findLast(
    renderData,
    d => {
      if (!d) return false
      if (d.showHover === false) return false
      ctx.lineJoin = 'round'
      if (d.hover1stPath2D) {
        return ctx.isPointInPath(d.hover1stPath2D, localMouse.x, localMouse.y)
      }
      if (d.type === 'text') return false
      if (d.type === 'area') {
        return ctx.isPointInPath(d.path2D, localMouse.x, localMouse.y)
      }
      if (d.type === 'line') return ctx.isPointInStroke(d.path2D, localMouse.x, localMouse.y)
      return false
    }
  )
)
export const findSecondPass = (ctx, localMouse, renderData) => (
  _.findLast(
    renderData,
    d => {
      if (!d) return false
      if (d.showHover === false) return false
      ctx.lineJoin = 'round'
      if (d.hover2ndPath2D) {
        return ctx.isPointInPath(d.hover2ndPath2D, localMouse.x, localMouse.y)
      }
      if (d.type === 'text') return false
      return ctx.isPointInStroke(d.path2D, localMouse.x, localMouse.y)
    }
  )
)
export const findInRenderLayers = ({ctx, localMouse, renderLayers, findFunc}) => {
  let renderDatum
  const layer = _.findLast(
    renderLayers,
    _layer => {
      if (_layer.layerProps.showHover === false) return false
      renderDatum = findFunc(ctx, localMouse, _layer.renderData)
      return renderDatum
    }
  )
  if (layer) {
    return {
      renderDatum,
      hoverRenderData: [renderDatum],
      hoverData: renderDatum.data,
      layerProps: layer.layerProps,
    }
  }
  return undefined
}
/*
Format return for getDataUnderMouse
*/
const formatReturnData = (foundData, localMouse) => ({
  layerProps: foundData.layerProps,
  renderDatum: foundData.renderDatum,
  hoverRenderData: foundData.hoverRenderData,
  hoverData: foundData.hoverData,
  localMouse,
})
/*
Find on the render data the geom that intersect whith the mouse position.
*/
export const getDataUnderMouse = (props, mouse, canvasNode) => {
  if (!canvasNode) return {}
  const {
    renderLayers,
  } = props

  const canvasRect = canvasNode.getBoundingClientRect()
  const ctx = canvasNode.getContext('2d')
  const localMouse = {
    x: mouse.x - canvasRect.left,
    y: mouse.y - canvasRect.top,
  }

  ctx.lineWidth = 10
  const inPathData = findInRenderLayers({
    ctx, localMouse, renderLayers, findFunc: findFirstPass,
  })

  if (inPathData) return formatReturnData(inPathData, localMouse)

  ctx.lineWidth = 18
  const inStrokeData = findInRenderLayers({
    ctx, localMouse, renderLayers, findFunc: findSecondPass,
  })

  if (inStrokeData) return formatReturnData(inStrokeData, localMouse)
  return {
    localMouse,
  }
}
