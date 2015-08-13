
import R from 'ramda'

import {rectBase} from './rectUtils'

export function clearRect(ctx, rectInput) {
  var rect = R.merge(rectBase, rectInput)
  ctx.clearRect(
    rect.x,
    rect.y,
    rect.width,
    rect.height
  )
}

export function fillRect(ctx, rectInput) {
  var rect = R.merge(rectBase, rectInput)
  ctx.fillRect(
    rect.x,
    rect.y,
    rect.width,
    rect.height
  )
}

export function strokeRect(ctx, rectInput) {
  var rect = R.merge(rectBase, rectInput)
  ctx.strokeRect(
    rect.x,
    rect.y,
    rect.width,
    rect.height
  )
}
