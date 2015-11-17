
import d3Scale from 'd3-scale'

export const getAxisScale = (props, key) => {
  const {
    [`${key}Type`]: type = 'linear',
    [`${key}Domain`]: domain = [0, 1],
    [`${key}Range`]: range = [0, 1],
    [`${key}TickCount`]: tickCount = 1,
  } = props
  switch (type) {
  case 'ordinal':
    const scaleOrdinal = d3Scale.ordinal()
      .domain(domain)
      .rangePoints(range, 1)
    return scaleOrdinal
  default:
    if (domain[0] === domain[1]) {
      const midRange = range[0] + (range[1] - range[0]) / 2
      const scaleLinear = () => midRange
      scaleLinear.tickFormat = () => d => d
      scaleLinear.ticks = () => [midRange]
      return scaleLinear
    }
    if (type === 'time') {
      return d3Scale.time()
        .domain(domain)
        .range(range)
        .nice(tickCount)
    }
    return d3Scale.linear()
      .domain(domain)
      .range(range)
      .nice(tickCount)
  }
}
export const getDefaultScale = (props, key) => {
  const {
    [`${key}Type`]: type = 'linear',
    [`${key}Domain`]: domain = [0, 1],
    [`${key}Range`]: range = [0, 1],
    [`${key}TickCount`]: tickCount = 0,
  } = props
  switch (type) {
  case 'ordinal':
    const scaleOrdinal = d3Scale.ordinal()
      .domain(domain)
      .range(range)
    return scaleOrdinal
  default:
    if (type === 'time') {
      return d3Scale.time()
        .domain(domain)
        .range(range)
        .nice(tickCount)
    }
    return d3Scale.linear()
      .domain(domain)
      .range(range)
      .nice(tickCount)
  }
}
export const getScale = (props, key) => {
  switch (key) {
  case 'x':
  case 'y':
    return getAxisScale(props, key)
  default:
    return getDefaultScale(props, key)
  }
}
