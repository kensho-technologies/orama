
import {BACKGROUND_OFFSET} from '../../Chart2/constants'

export const clearAndClip = (props, ctx) => {
  const {
    size = {width: 100, height: 100},
    backgroundOffset = BACKGROUND_OFFSET,
  } = props
  ctx.clearRect(
    0, 0,
    size.width,
    size.height
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
