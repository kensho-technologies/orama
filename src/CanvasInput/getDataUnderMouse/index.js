import _ from 'lodash'

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
  ctx.lineWidth = 2
  const inPathData = findInRenderLayers({
    ctx, localMouse, renderLayers, findFunc: findInPath,
  })
  if (inPathData) {
    return {
      ...inPathData,
      localMouse,
      mouse,
    }
  }
  ctx.lineWidth = 20
  const inStrokeData = findInRenderLayers({
    ctx, localMouse, renderLayers, findFunc: findInStroke,
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
