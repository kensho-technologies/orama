
import {map, omit} from 'lodash'

import * as examples from '../examples'
import * as kExamples from '../kExamples'

export const examplesData = map(
  examples,
  (value, key) => ({
    ...value,
    id: key,
  })
)

export const kExamplesData = map(
  omit(kExamples, 'default'),
  (value, key) => ({
    ...value,
    id: key,
  })
)
