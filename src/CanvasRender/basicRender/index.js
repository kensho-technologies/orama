
import _ from 'lodash'
import {clearAndClip} from '../clearAndClip'

export const basicRender = (props, ctx) => {
  const {
    renderData = [],
  } = props

  ctx.save()
  clearAndClip(props, ctx)
  _.each(
    renderData,
    d => {
      if (!d) return
      if (d.type === 'line') {
        ctx.globalAlpha = d.strokeAlpha || d.alpha
        ctx.lineWidth = d.lineWidth || 2
        ctx.strokeStyle = d.stroke || 'hsl(200,30%, 50%)'
        ctx.stroke(d.path2D)
      } else if (d.type === 'area') {
        ctx.globalAlpha = d.fillAlpha || d.alpha
        ctx.lineWidth = d.lineWidth
        ctx.strokeStyle = d.stroke || 'hsl(200,30%, 50%)'
        ctx.fillStyle = d.fill || 'hsl(200,30%, 50%)'
        ctx.fill(d.path2D)
        ctx.stroke(d.path2D)
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
