
import _ from 'lodash'

/*
checker for the local compact
*/
const checkUndefinedValue = value => (
  _.isUndefined(value) || _.isNaN(value) || _.isNull(value)
)
/*
same as _.compact, but keep the zeros, they are important for dataVis
*/
export const compactData = array => (
  _.reduce(
    array,
    (acc, d) => {
      if (checkUndefinedValue(d)) return acc
      acc.push(d)
      return acc
    },
    []
  )
)
