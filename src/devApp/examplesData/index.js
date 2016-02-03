
import {map} from 'lodash'

import * as examples from '../examples'

export const examplesData = map(
  examples,
  (value, key) => ({
    ...value,
    id: key,
  })
)
