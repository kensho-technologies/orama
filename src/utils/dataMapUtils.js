
import R from 'ramda'

const noop = () => undefined

export function checkSchema(schema, data) {
  return !R.any(d => {
    var error = d[1](data, d[0], JSON.stringify(data))
    if (error) {
      throw error
    }
    return false
  }, R.toPairs(schema))
}

export function softCheckSchema(schema, data) {
  return !R.any(d => {
    var error = d[1](data, d[0], JSON.stringify(data))
    if (error) {
      return true
    }
    return false
  }, R.toPairs(schema))
}

export function mapToPoints(dimensions, data) {
  const xMap = getMap(dimensions.x)
  const yMap = getMap(dimensions.y)
  return R.map(d => {
    const x = xMap(d)
    const y = yMap(d)
    const path2D = new Path2D()
    path2D.arc(x, y, 5, 0, 2 * Math.PI)
    return {
      x, y, d, path2D,
    }
  }, data)
}

export function getMap(dimension) {
  if (!dimension) return noop
  const range = R.prop('range', dimension)
  if (!range) return noop
  const mapRange = () => range[0] + (range[1] - range[0]) / 2
  const pathArray = R.prop('path', dimension)
  const scale = R.prop('scale', dimension)
  if (!pathArray || !scale) return mapRange
  return R.pipe(R.path(pathArray), scale)
}
