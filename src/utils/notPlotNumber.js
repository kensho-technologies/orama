// Copyright 2018 Kensho Technologies, LLC.

import {isNumber} from 'lodash'

const checkNotPlotNumber = value => isNaN(value) || !isNumber(value)

export default function notPlotNumber(value) {
  if (!Array.isArray(value)) return checkNotPlotNumber(value)
  return value.some(checkNotPlotNumber)
}
