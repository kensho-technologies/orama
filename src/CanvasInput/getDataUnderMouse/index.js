import _ from 'lodash'

export const findFirstPass = (ctx, localMouse, renderData) => (
  _.findLast(
    renderData,
    d => {
      if (d.showHover === false) return false
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
      if (d.showHover === false) return false
      if (d.type === 'text') return false
      if (d.hoverPath2D) {
        return ctx.isPointInPath(d.hoverPath2D, localMouse.x, localMouse.y)
      }
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
}
/*
Format return for getDataUnderMouse
*/
const formatReturnData = (foundData, localMouse, mouse) => ({
  layerProps: foundData.layerProps,
  renderDatum: foundData.renderDatum,
  hoverRenderData: foundData.hoverRenderData,
  hoverData: foundData.hoverData,
  localMouse,
  mouse,
})
/*
Find on the render data the geom that intersect whith the mouse position.
*/
export const getDataUnderMouse = (props, evt, canvasNode) => {
  const {
    renderLayers,
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
  ctx.lineWidth = 10
  const inPathData = findInRenderLayers({
    ctx, localMouse, renderLayers, findFunc: findFirstPass,
  })

  if (inPathData) return formatReturnData(inPathData, localMouse, mouse)

  ctx.lineWidth = 18
  const inStrokeData = findInRenderLayers({
    ctx, localMouse, renderLayers, findFunc: findSecondPass,
  })

  if (inStrokeData) return formatReturnData(inStrokeData, localMouse, mouse)
  return {
    mouse,
    localMouse,
  }
}
