// Copyright 2018 Kensho Technologies, LLC.

import _ from 'lodash'

import {ACCESSORS_TOOLTIP_ORDER} from '../../chartCore/defaults'
import {getTooltipFormat} from '../../chartCore/getForKey'
import {getScaleKeyByHash} from '../../Layer/plotValue'

const getDatum = data => {
  if (_.isArray(data)) return _.head(data)
  return data
}
const isDisplayable = value => value !== 'NaN' && !_.isUndefined(value) && !_.isNaN(value)
const tooltipValuesForStrings = (tooltipExtraDimensions, datum) =>
  _.reduce(
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
const tooltipValuesForObjects = (tooltipExtraDimensions, datum) =>
  _.reduce(
    tooltipExtraDimensions,
    (acc, obj) => {
      const {accessor, value, format = d => d, name} = obj
      acc.push({
        name: name || accessor,
        value: format(value || _.get(datum, accessor)),
      })
      return acc
    },
    []
  )
const getExtraTooltipValues = (props, datum) => {
  const {tooltipExtraDimensions} = props
  if (_.some(tooltipExtraDimensions, _.isString)) {
    return tooltipValuesForStrings(tooltipExtraDimensions, datum)
  }
  return tooltipValuesForObjects(tooltipExtraDimensions, datum)
}
export const extractTooltipData = (props, hoverData) => {
  const {localKeys, tooltipKeys, accessorsTooltipOrder = ACCESSORS_TOOLTIP_ORDER} = props

  const datum = getDatum(hoverData)
  const tooltipValues = _.reduce(
    tooltipKeys || localKeys,
    (acc, key) => {
      const scaleKey = getScaleKeyByHash(props, key)
      const keyAlias = props[`${key}Alias`] || key
      const name = props[`${key}Name`] || props[key]
      const formatter = props[`${scaleKey}TooltipFormat`] || getTooltipFormat(props, scaleKey)
      const value = formatter(_.get(datum, props[key]))
      const order = accessorsTooltipOrder[key]
      if (isDisplayable(value)) {
        acc.push({key: keyAlias, name, value, order})
      }
      return acc
    },
    []
  )
  const extraTooltipValues = getExtraTooltipValues(props, datum)
  const orderedTooltipValues = _.map(_.sortBy(tooltipValues, 'order'), values =>
    _.omit(values, 'order')
  )
  const title = props.titleValue || datum[props.title]
  return {
    title,
    values: orderedTooltipValues.concat(extraTooltipValues),
  }
}
