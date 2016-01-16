
import {it as test} from 'mocha'
import assert from 'assert'

import {getMemoizeDimArrays} from './'

test('Chart/memoize.getMemoizeDimArrays', () => {
  const memoizeAddDimArrays = getMemoizeDimArrays()
  const props = {
    localAccessors: {x: 'x'},
    data: [{x: 1}, {x: 2}, {x: 3}],
    x: 'x',
  }
  const result = memoizeAddDimArrays(props)
  const expected = memoizeAddDimArrays(props).xArray
  const actual = result.xArray
  assert.equal(expected, actual)
})
