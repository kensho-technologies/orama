
import _ from 'lodash'
import {clearAndClip} from '../clearAndClip'

export const hoverRender = (props, ctx) => {
  const {
    renderData = [],
  } = props

  if (renderData.length === 0) return
  ctx.save()
  clearAndClip(props, ctx)

  _.each(
    renderData,
    d => {
      if (!d) return
      ctx.lineWidth = d.hoverLineWidth || 2
      ctx.strokeStyle = d.hoverStroke || 'black'
      ctx.stroke(d.path2D)
    }
  )
  ctx.restore()
}
