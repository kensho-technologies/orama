
import {it as test} from 'mocha'
import assert from 'assert'

import * as methods from './'

test('memoize.getMemoizeAddDimArrays', () => {
  const memoizeAddDimArrays = methods.getMemoizeAddDimArrays()
  const props = {
    localAccessors: {x: 'x'},
    data: [{x: 1}, {x: 2}, {x: 3}],
    x: 'x',
  }
  const memoizedProps = memoizeAddDimArrays(props)
  assert.equal(
    memoizeAddDimArrays(props).xArray,
    memoizedProps.xArray,
  )
})
