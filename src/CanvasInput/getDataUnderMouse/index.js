import _ from 'lodash'

const findFirstPass = (ctx, localMouse, renderData) => (
  _.findLast(
    renderData,
    d => {
      if (d.type === 'text') return false
      if (d.type === 'area') {
        return ctx.isPointInPath(d.path2D, localMouse.x, localMouse.y)
      }
      if (d.type === 'line') return ctx.isPointInStroke(d.path2D, localMouse.x, localMouse.y)
      return false
    }
  )
)
const findSecondPass = (ctx, localMouse, renderData) => (
  _.findLast(
    renderData,
    d => {
      if (d.type === 'text') return false
      if (d.hoverPath2D) {
        return ctx.isPointInPath(d.hoverPath2D, localMouse.x, localMouse.y)
      }
      return ctx.isPointInStroke(d.path2D, localMouse.x, localMouse.y)
    }
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
      hoverRenderData: [renderDatum],
      hoverData: renderDatum.data,
      layerProps: layer.props,
    }
  }
}
/**
 * Find on the render data the geom that intersect whith the mouse position.
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
  if (inPathData) {
    return {
      ...inPathData,
      localMouse,
      mouse,
    }
  }
  ctx.lineWidth = 18
  const inStrokeData = findInRenderLayers({
    ctx, localMouse, renderLayers, findFunc: findSecondPass,
  })
  if (inStrokeData) {
    return {
      ...inStrokeData,
      localMouse,
      mouse,
    }
  }
  return {}
}
