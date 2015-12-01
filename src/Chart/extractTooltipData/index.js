
import _ from 'lodash'
import {ACCESSORS_TOOLTIP_ORDER} from '../defaults'

export const extractTooltipData = (props, _tooltipDimensions, datum) => {
  const {
    tooltipDimensions = _tooltipDimensions,
    accessorsTooltipOrder = ACCESSORS_TOOLTIP_ORDER,
  } = props

  const tooltipValues = _.reduce(
    tooltipDimensions,
    (acc, key) => {
      const name = props[`${key}Name`] || props[key]
      let value = _.get(datum, props[key])
      if (props[`${key}Type`] === 'time') {
        value = value.toDateString()
      }
      const order = accessorsTooltipOrder[key]
      if (!_.isUndefined(value)) acc.push({key, name, value, order})
      return acc
    },
    []
  )
  const orderedTooltipValues = _.map(
    _.sortBy(tooltipValues, 'order'),
    _.partialRight(_.omit, 'order')
  )
  const title = datum[props[`label`]]
  return {
    title,
    values: orderedTooltipValues,
  }
}
