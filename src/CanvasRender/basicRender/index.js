
import _ from 'lodash'
import {BACKGROUND_OFFSET} from '../../Chart2/constants'

export const basicRender = (props, ctx) => {
  const {
    plotRect,
    renderData = [],
    size = {width: 100, height: 100},
    backgroundOffset = BACKGROUND_OFFSET,
  } = props

  if (renderData.length === 0) return
  ctx.save()
  ctx.clearRect(
    0, 0,
    size.width,
    size.height
  )
  if (plotRect && props.clip) {
    ctx.beginPath()
    ctx.rect(
      plotRect.x - backgroundOffset,
      plotRect.y - backgroundOffset,
      plotRect.width + backgroundOffset * 2,
      plotRect.height + backgroundOffset * 2,
    )
    ctx.clip()
  }

  _.each(
    renderData,
    d => {
      if (!d) return
      ctx.globalAlpha = _.isUndefined(d.alpha) ? 1 : d.alpha
      if (d.type === 'line') {
        ctx.lineWidth = d.lineWidth || 2
        ctx.strokeStyle = d.stroke || 'hsl(200,30%, 50%)'
        ctx.stroke(d.path2D)
      } else if (d.type === 'area') {
        ctx.lineWidth = d.lineWidth
        ctx.strokeStyle = d.stroke
        ctx.fillStyle = d.fill || 'hsl(200,30%, 50%)'
        ctx.fill(d.path2D)
      } else if (d.type === 'text') {
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
