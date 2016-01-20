/* eslint no-param-reassign:0 */

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
  const {theme} = props
  ctx.save()
  clearAndClip(props, ctx)
  _.each(
    getRenderObjects(props),
    d => {
      if (!d) return
      if (d.type === 'line') {
        ctx.globalAlpha = d.strokeAlpha || d.alpha || theme.plotAlpha
        ctx.lineWidth = d.lineWidth || theme.plotLineWidth
        ctx.strokeStyle = d.stroke || theme.plotFill
        if (d.lineDash) {
          ctx.setLineDash(d.lineDash)
        }
        ctx.stroke(d.path2D)
      } else if (d.type === 'area') {
        ctx.globalAlpha = d.fillAlpha || d.alpha || theme.plotAlpha
        ctx.fillStyle = d.fill || theme.plotFill
        ctx.fill(d.path2D)
      } else if (d.type === 'text') {
        ctx.globalAlpha = d.alpha
        ctx.font = d.font || `${theme.plotFontSize}px ${theme.fontFamilyMono}`
        ctx.fillStyle = d.fill || theme.textFill
        ctx.textAlign = d.textAlign || 'left'
        ctx.textBaseline = d.textBaseline || 'alphabetic'
        ctx.fillText(d.label, d.x, d.y)
      }
    },
  )
  ctx.restore()
}
