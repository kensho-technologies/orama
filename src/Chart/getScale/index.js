
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
    const scaleOrdinal = d3Scale.ordinal()
      .domain(domain)
      .rangePoints(range, 1)
    return scaleOrdinal
  default:
    if (domain[0] === domain[1]) {
      const midRange = range[0] + (range[1] - range[0]) / 2
      const linearScaleFlatDomain = () => midRange
      linearScaleFlatDomain.tickFormat = () => d => d
      linearScaleFlatDomain.ticks = () => [domain[0]]
      return linearScaleFlatDomain
    }
    if (type === 'time') {
      const timeScale = d3Scale.time()
        .domain(domain)
        .range(range)
      if (nice) timeScale.nice(tickCount)
      return timeScale
    }
    const linearScale = d3Scale.linear()
      .domain(domain)
      .range(range)
    if (nice) linearScale.nice(tickCount)
    return linearScale
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
    if (type === 'time') {
      const timeScale = d3Scale.time()
        .domain(domain)
        .range(range)
      if (nice) timeScale.nice(tickCount)
      return timeScale
    }
    const linearScale = d3Scale.linear()
      .domain(domain)
      .range(range)
    if (nice) linearScale.nice(tickCount)
    return linearScale
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
