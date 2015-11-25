
import _ from 'lodash'
import {clearAndClip} from '../clearAndClip'
import {BACKGROUND_OFFSET} from '../../Chart2/defaults'

export const highlightRender = (props, ctx) => {
  const {
    backgroundOffset = BACKGROUND_OFFSET,
    plotRect,
    renderData = [],
  } = props

  if (renderData.length === 0) return
  ctx.save()
  clearAndClip(props, ctx)

  ctx.globalAlpha = 0.7
  ctx.fillStyle = 'hsl(0, 0%, 97%)'
  ctx.rect(
    plotRect.x - backgroundOffset,
    plotRect.y - backgroundOffset,
    plotRect.width + backgroundOffset * 2,
    plotRect.height + backgroundOffset * 2,
  )
  ctx.fill()
  _.each(
    renderData,
    d => {
      ctx.globalAlpha = d.alpha || 1
      if (d.type === 'line') {
        ctx.lineWidth = d.lineWidth || 2
        ctx.strokeStyle = d.stroke || 'hsl(200,30%, 50%)'
        ctx.stroke(d.path2D)
      } else if (d.type === 'area') {
        ctx.fillStyle = d.fill || 'hsl(200,30%, 50%)'
        ctx.fill(d.path2D)
      }
    },
  )
  ctx.restore()
}
