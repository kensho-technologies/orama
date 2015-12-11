
import _ from 'lodash'
import {ACCESSORS_TOOLTIP_ORDER} from '../defaults'

const getDatum = data => {
  if (_.isArray(data)) return _.first(data)
  return data
}

export const extractTooltipData = (props, hoverData) => {
  const {
    localDimensions,
    tooltipDimensions,
    accessorsTooltipOrder = ACCESSORS_TOOLTIP_ORDER,
  } = props

  const datum = getDatum(hoverData)

  const tooltipValues = _.reduce(
    localDimensions,
    (acc, key) => {
      const keyAlias = props[`${key}Alias`] || key
      const name = props[`${key}Name`] || props[key]
      const formatter = props[`${key}TooltipFormatter`]
      let value = _.get(datum, props[key])
      if (formatter) {
        value = formatter(value)
      } else if (_.isDate(value)) {
        value = value.toDateString()
      }
      const order = accessorsTooltipOrder[key]
      if (!_.isUndefined(value)) acc.push({key: keyAlias, name, value, order})
      return acc
    },
    []
  )
  const extraTooltipValues = _.reduce(
    tooltipDimensions,
    (acc, key) => {
      let value = _.get(datum, key)
      if (_.isDate(value)) {
        value = value.toDateString()
      }
      if (!_.isUndefined(value)) acc.push({name: key, value})
      return acc
    },
    []
  )
  const orderedTooltipValues = _.map(
    _.sortBy(tooltipValues, 'order'),
    values => _.omit(values, 'order'),
  )
  const title = datum[props[`label`]]
  return {
    title,
    values: orderedTooltipValues.concat(extraTooltipValues),
  }
}
