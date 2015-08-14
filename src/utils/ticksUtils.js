
import * as dimUtils from './dimensionUtils'

const TICKS_X_SPACE = 80
const TICKS_Y_SPACE = 65

export function getXMappedData(dimensions) {
  const ticks = getXTicks(dimensions)
  R.map(d => {
    const guidePath = new Path2D()
    guidePath.moveToPoint
    return {
      guidePath: null,
      tickPath: null,
      textPoint: {x: 0, y: 0},
      text: d,
    }
  }, ticks)
}

export function getTicks(dimension, count) {
  if (dimension.type === 'linear') {
    const scale = dimUtils.getScaleForType(dimension.type)
    scale.domain(dimension.domain)
    return scale.ticks(count)
  }
}

export function getXTicks(dimensions, plotRect) {
  const dimension = dimensions.x
  const range = plotRect ?
    [plotRect.x, plotRect.x + plotRect.width] :
    dimension.range
  const count = (range[1] - range[0]) / TICKS_X_SPACE
  return getTicks(dimension, count)
}

export function getYTicks(dimensions, plotRect) {
  const dimension = dimensions.y
  const range = plotRect ?
    [plotRect.y, plotRect.y + plotRect.height] :
    dimension.range
  const count = (range[0] - range[1]) / TICKS_Y_SPACE
  return getTicks(dimension, count)
}
