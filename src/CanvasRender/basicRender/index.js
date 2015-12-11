
import _ from 'lodash'
import {clearAndClip} from '../clearAndClip'

const extractRenderDataFromLayers = renderLayers => _.flatten(_.pluck(renderLayers, 'renderData'))

const getRenderObjects = props => {
  const {
    renderData,
    renderLayers,
  } = props
  if (renderData) return renderData
  if (renderLayers) return extractRenderDataFromLayers(renderLayers)
  return []
}

export const basicRender = (props, ctx) => {
  ctx.save()
  clearAndClip(props, ctx)
  _.each(
    getRenderObjects(props),
    d => {
      if (!d) return
      if (d.type === 'line') {
        ctx.globalAlpha = d.strokeAlpha || d.alpha || 0.85
        ctx.lineWidth = d.lineWidth || 2
        ctx.strokeStyle = d.stroke || 'hsl(200,30%, 50%)'
        ctx.stroke(d.path2D)
      } else if (d.type === 'area') {
        ctx.globalAlpha = d.fillAlpha || d.alpha || 0.85
        ctx.fillStyle = d.fill || 'hsl(200,30%, 50%)'
        ctx.fill(d.path2D)
      } else if (d.type === 'text') {
        ctx.globalAlpha = d.alpha
        ctx.font = d.font || '14px verdana'
        ctx.fillStyle = d.fill || 'black'
        ctx.textAlign = d.textAlign || 'left'
        ctx.textBaseline = d.textBaseline || 'alphabetic'
        ctx.fillText(d.value, d.x, d.y)
      }
    },
  )
  ctx.restore()
}
