
import _ from 'lodash'
import {BACKGROUND_OFFSET} from '../../Chart2/constants'

export const hoverRender = (props, ctx) => {
  const {
    plotRect,
    renderData = [],
    size,
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
      ctx.lineWidth = d.hoverLineWidth || 2
      ctx.strokeStyle = d.hoverStroke || 'black'
      ctx.stroke(d.path2D)
    }
  )
  ctx.restore()
}
