
import d3Scale from 'd3-scale'
import {
  DOMAIN,
  NICE,
  RANGE,
  TICK_COUNT,
  TYPE,
} from '../defaults'

/*
`getScale` returns the scale for a key according to configurations on props object.

@calling logic
getScale{
  getAxisScale{
    d3Scale()
  }
  getDefaultScale{
    d3Scale()
  }
}

@example
getScale({xType, xDomain, xRange, xTickCount}, 'x')
returns {
  ...props,
  xScale,
}
*/

/*
get a scale with logic for the x and y axis, if the domain starts and finishes on the same number returns the mid range value.
*/
const getBaseScales = (type, domain, range, nice, tickCount) => {
  if (type === 'time') {
    const timeScale = d3Scale.time()
      .domain(domain)
      .range(range)
    if (nice) timeScale.nice(tickCount)
    return timeScale
  }
  if (type === 'log') {
    const logScale = d3Scale.log()
      .domain(domain)
      .range(range)
    if (nice) logScale.nice(tickCount)
    return logScale
  }
  const linearScale = d3Scale.linear()
    .domain(domain)
    .range(range)
  if (nice) linearScale.nice(tickCount)
  return linearScale
}

export const getAxisScale = (props, key) => {
  const {
    [`${key}Type`]: type = TYPE,
    [`${key}Domain`]: domain = DOMAIN,
    [`${key}Range`]: range = RANGE,
    [`${key}TickCount`]: tickCount = TICK_COUNT,
    [`${key}Nice`]: nice = NICE,
  } = props
  switch (type) {
    case 'ordinal':
      const scaleOrdinal = d3Scale.point()
        .domain(domain)
        .range(range)
        .padding(0.5)
      return scaleOrdinal
    default:
      if (domain[0] === domain[1]) {
        const midRange = range[0] + (range[1] - range[0]) / 2
        const linearScaleFlatDomain = () => midRange
        linearScaleFlatDomain.tickFormat = () => d => d
        linearScaleFlatDomain.ticks = () => [domain[0]]
        return linearScaleFlatDomain
      }
      return getBaseScales(type, domain, range, nice, tickCount)
  }
}
export const getDefaultScale = (props, key) => {
  const {
    [`${key}Type`]: type = TYPE,
    [`${key}Domain`]: domain = DOMAIN,
    [`${key}Range`]: range = RANGE,
    [`${key}TickCount`]: tickCount = TICK_COUNT,
    [`${key}Nice`]: nice = NICE,
  } = props
  switch (type) {
    case 'ordinal':
      const scaleOrdinal = d3Scale.ordinal()
        .domain(domain)
        .range(range)
      return scaleOrdinal
    default:
      return getBaseScales(type, domain, range, nice, tickCount)
  }
}
/*
Main exported function, used outside of the module on the Chart props transform flow.
*/
export const getScale = (props, key) => {
  switch (key) {
    case 'x':
    case 'y':
      return getAxisScale(props, key)
    default:
      return getDefaultScale(props, key)
  }
}
