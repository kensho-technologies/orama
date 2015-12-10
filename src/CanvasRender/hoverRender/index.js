
import _ from 'lodash'
import {clearAndClip} from '../clearAndClip'

export const hoverRender = (props, ctx) => {
  const {
    renderData = [],
  } = props

  ctx.save()
  clearAndClip(props, ctx)

  _.each(
    renderData,
    d => {
      if (!d) return
      ctx.globalAlpha = d.hoverStrokeAlpha || d.hoverAlpha || 0.5
      ctx.lineWidth = d.hoverLineWidth || 2
      ctx.strokeStyle = d.hoverStroke || 'black'
      ctx.stroke(d.path2D)
      if (d.hoverFill) {
        ctx.globalAlpha = d.hoverStrokeAlpha || d.hoverAlpha || 0.5
        ctx.fillStyle = d.hoverFill
        ctx.fill(d.path2D)
      }
    }
  )
  ctx.restore()
}
