
import _ from 'lodash'

export const getTimeSeries = (range, coeff = 0.05) => {
  function bump(_array) {
    const x = 1 / (0.1 + Math.random())
    const y = 2 * Math.random() - 0.5
    const z = 10 / (0.1 + Math.random())
    _.forEach(
      range,
      (d, i) => {
        const w = (i / range.length - y) * z
        _array[i] += x * Math.exp(-w * w)
      }
    )
  }
  const array = []
  _.forEach(
    range,
    (d, i) => array[i] = coeff + coeff * Math.random()
  )
  _.forEach(range, () => bump(array))
  return _.map(array, (d, i) => ({x: range[i], y: Math.max(0, d)}))
}
