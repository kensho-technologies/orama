
import _ from 'lodash'
import {clearAndClip} from '../clearAndClip'

export const hoverRender = (props, ctx) => {
  const {
    renderData = [],
    theme,
  } = props

  ctx.save()
  clearAndClip(props, ctx)

  _.each(
    renderData,
    d => {
      if (!d) return
      if (d.type === 'line') {
        ctx.globalAlpha = props.hoverAlpha || d.hoverAlpha || 0.5
        ctx.lineWidth = props.hoverLineWidth || d.hoverLineWidth || theme.plotLineWidth
        ctx.strokeStyle = props.hoverStroke || d.hoverStroke || theme.textFill
        ctx.stroke(d.path2D)
      } else if (d.type === 'area') {
        ctx.globalAlpha = props.hoverAlpha || d.hoverAlpha || 0.4
        ctx.fillStyle = props.hoverFill || d.hoverFill || theme.textFill
        ctx.fill(d.path2D)
      }
    }
  )
  ctx.restore()
}
