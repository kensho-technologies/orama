
import {map, omit, filter} from 'lodash'

import * as examples from '../examples'
import * as kExamples from '../kExamples'

const _examplesData = map(
  examples,
  (value, key) => ({
    ...value,
    id: key,
  }),
)

const kExamplesData = map(
  omit(kExamples, 'default'),
  (value, key) => ({
    ...value,
    k: true,
    id: key,
  }),
)

export const examplesData = filter(
  _examplesData.concat(kExamplesData),
  d => {
    if (process.env !== 'production') return true
    if (d.hide) return false
    return true
  },
)
