// Copyright 2018 Kensho Technologies, LLC.

import {get, head, isNaN, map, omit, reduce, some, sortBy} from 'lodash'

import {ACCESSORS_TOOLTIP_ORDER} from '../defaults'
import getScaleKeyByHash from '../plot/getScaleKeyByHash'
import getTooltipFormat from '../chartCore/getTooltipFormat'

function getDatum(data) {
  return Array.isArray(data) ? head(data) : data
}

function isDisplayable(value) {
  return value !== 'NaN' && value !== undefined && !isNaN(value)
}

const tooltipValuesForStrings = (tooltipExtraDimensions, datum) =>
  reduce(
    tooltipExtraDimensions,
    (acc, key) => {
      const rawValue = get(datum, key)
      const value = rawValue instanceof Date ? rawValue.toDateString() : rawValue
      if (isDisplayable(value)) acc.push({name: key, value})
      return acc
    },
    []
  )

function tooltipValuesForObjects(tooltipExtraDimensions, datum) {
  return map(tooltipExtraDimensions, obj => {
    const {accessor, value, format = d => d, name} = obj
    return {name: name || accessor, value: format(value || get(datum, accessor))}
  })
}

function getExtraTooltipValues(props, datum) {
  const {tooltipExtraDimensions} = props
  return some(tooltipExtraDimensions, dimension => typeof dimension === 'string')
    ? tooltipValuesForStrings(tooltipExtraDimensions, datum)
    : tooltipValuesForObjects(tooltipExtraDimensions, datum)
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
      if (isDisplayable(value)) acc.push({key: keyAlias, name, value, order})
      return acc
    },
    []
  )
  const extraTooltipValues = getExtraTooltipValues(props, datum)
  const orderedTooltipValues = map(sortBy(tooltipValues, 'order'), values => omit(values, 'order'))
  const title = props.titleValue || datum[props.title]
  const values = orderedTooltipValues.concat(extraTooltipValues)
  return {title, values}
}
