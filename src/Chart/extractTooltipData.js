// Copyright 2018 Kensho Technologies, LLC.

import {get, head, isArray, isDate, isNaN, isString, map, omit, reduce, some, sortBy} from 'lodash'

import {ACCESSORS_TOOLTIP_ORDER} from '../chartCore/defaults'
import {getTooltipFormat} from '../chartCore/getForKey'
import getScaleKeyByHash from '../Layer/getScaleKeyByHash'

function getDatum(data) {
  if (isArray(data)) return head(data)
  return data
}

const isDisplayable = value => value !== 'NaN' && value !== undefined && !isNaN(value)

const tooltipValuesForStrings = (tooltipExtraDimensions, datum) =>
  reduce(
    tooltipExtraDimensions,
    (acc, key) => {
      let value = get(datum, key)
      if (isDate(value)) {
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
  reduce(
    tooltipExtraDimensions,
    (acc, obj) => {
      const {accessor, value, format = d => d, name} = obj
      acc.push({
        name: name || accessor,
        value: format(value || get(datum, accessor)),
      })
      return acc
    },
    []
  )

function getExtraTooltipValues(props, datum) {
  const {tooltipExtraDimensions} = props
  if (some(tooltipExtraDimensions, isString)) {
    return tooltipValuesForStrings(tooltipExtraDimensions, datum)
  }
  return tooltipValuesForObjects(tooltipExtraDimensions, datum)
}

export default function extractTooltipData(props, hoverData) {
  const {localKeys, tooltipKeys, accessorsTooltipOrder = ACCESSORS_TOOLTIP_ORDER} = props

  const datum = getDatum(hoverData)
  const tooltipValues = reduce(
    tooltipKeys || localKeys,
    (acc, key) => {
      const scaleKey = getScaleKeyByHash(props, key)
      const keyAlias = props[`${key}Alias`] || key
      const name = props[`${key}Name`] || props[key]
      const formatter = props[`${scaleKey}TooltipFormat`] || getTooltipFormat(props, scaleKey)
      const value = formatter(get(datum, props[key]))
      const order = accessorsTooltipOrder[key]
      if (isDisplayable(value)) {
        acc.push({key: keyAlias, name, value, order})
      }
      return acc
    },
    []
  )
  const extraTooltipValues = getExtraTooltipValues(props, datum)
  const orderedTooltipValues = map(sortBy(tooltipValues, 'order'), values => omit(values, 'order'))
  const title = props.titleValue || datum[props.title]
  return {
    title,
    values: orderedTooltipValues.concat(extraTooltipValues),
  }
}
