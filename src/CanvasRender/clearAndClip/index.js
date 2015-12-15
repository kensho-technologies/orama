
import {BACKGROUND_OFFSET} from '../../Chart/defaults'

export const clearAndClip = (props, ctx) => {
  const {
    width,
    height,
    backgroundOffset = BACKGROUND_OFFSET,
  } = props
  ctx.clearRect(
    0, 0,
    width,
    height
  )
  if (props.plotRect && props.clip) {
    ctx.beginPath()
    ctx.rect(
      props.plotRect.x - backgroundOffset,
      props.plotRect.y - backgroundOffset,
      props.plotRect.width + backgroundOffset * 2,
      props.plotRect.height + backgroundOffset * 2,
    )
    ctx.clip()
  }
}
