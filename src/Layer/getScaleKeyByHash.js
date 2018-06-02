import {each, memoize, reduce} from 'lodash'

import {ACCESSORS_GROUPS} from '../chartCore/defaults'

const generateAccessorGroupHash = memoize(accessorsGroups =>
  reduce(
    accessorsGroups,
    (acc, values, key) => {
      each(values, d => {
        acc[d] = key // eslint-disable-line no-param-reassign
      })
      return acc
    },
    {}
  )
)

// used to return the main key for a group of accessors
// for example, x, x0, x1 and x2 all will return 'x'
export default function getScaleKeyByHash(props, key) {
  const {accessorsGroups = ACCESSORS_GROUPS} = props
  const hash = generateAccessorGroupHash(accessorsGroups)
  return hash[key] || key
}
