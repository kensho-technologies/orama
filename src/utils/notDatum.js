// Copyright 2018 Kensho Technologies, LLC.

import {isNaN, isNull, isUndefined} from 'lodash'

export default function notDatum(value) {
  return isUndefined(value) || isNaN(value) || isNull(value)
}
