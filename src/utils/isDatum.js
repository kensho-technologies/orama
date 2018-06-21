// Copyright 2018 Kensho Technologies, LLC.

import {isNaN} from 'lodash'

export default function isDatum(value) {
  return value != null && !isNaN(value)
}
