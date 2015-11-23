
import d3Scale from 'd3-scale'
import {
  DOMAIN,
  RANGE,
  TICK_COUNT,
  TYPE,
} from '../constants'

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
      scaleLinear.ticks = () => [domain[0]]
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
    [`${key}Type`]: type = TYPE,
    [`${key}Domain`]: domain = DOMAIN,
    [`${key}Range`]: range = RANGE,
    [`${key}TickCount`]: tickCount = TICK_COUNT,
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
