// Copyright 2018 Kensho Technologies, LLC.

import {isNaN, isNumber} from 'lodash'

const checkNotPlotNumber = value => isNaN(value) || !isNumber(value)

export default function notPlotNumber(value) {
  return Array.isArray(value) ? value.some(checkNotPlotNumber) : checkNotPlotNumber(value)
}
