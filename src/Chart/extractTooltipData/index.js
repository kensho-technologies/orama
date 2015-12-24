
import _ from 'lodash'
import {ACCESSORS_TOOLTIP_ORDER} from '../defaults'
import {getTooltipFormat} from '../../Chart/getMethods'

const getDatum = data => {
  if (_.isArray(data)) return _.first(data)
  return data
}

const isDisplayable = value => (
  value !== 'NaN' &&
  !_.isUndefined(value) &&
  !_.isNaN(value)
)

export const extractTooltipData = (props, hoverData) => {
  const {
    localKeys,
    tooltipExtraDimensions,
    tooltipKeys,
    accessorsTooltipOrder = ACCESSORS_TOOLTIP_ORDER,
  } = props

  const datum = getDatum(hoverData)
  const tooltipValues = _.reduce(
    tooltipKeys || localKeys,
    (acc, key) => {
      const keyAlias = props[`${key}Alias`] || key
      const name = props[`${key}Name`] || props[key]
      const formatter = props[`${key}TooltipFormat`] || getTooltipFormat(props, key)
      const value = formatter(_.get(datum, props[key]))
      const order = accessorsTooltipOrder[key]
      if (isDisplayable(value)) {
        acc.push({key: keyAlias, name, value, order})
      }
      return acc
    },
    []
  )
  const extraTooltipValues = _.reduce(
    tooltipExtraDimensions,
    (acc, key) => {
      let value = _.get(datum, key)
      if (_.isDate(value)) {
        value = value.toDateString()
      }
      if (isDisplayable(value)) {
        acc.push({name: key, value})
      }
      return acc
    },
    []
  )
  const orderedTooltipValues = _.map(
    _.sortBy(tooltipValues, 'order'),
    values => _.omit(values, 'order'),
  )
  const title = props.labelValue || datum[props[`label`]]
  return {
    title,
    values: orderedTooltipValues.concat(extraTooltipValues),
  }
}
