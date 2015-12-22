
import {it as test} from 'mocha'
import assert from 'assert'
import {addTypes} from '../../Chart/addMethods'

import * as methods from './'

test('memoize.getMemoizeAddTypes', () => {
  const memoizeAddTypes = methods.getMemoizeAddTypes()
  const props = {
    groupedKeys: ['x'],
    xArray: [1, 2, 3],
  }
  const memoizedProps = memoizeAddTypes(props)
  assert.equal(
    memoizeAddTypes(props),
    memoizedProps,
  )
  assert.notEqual(
    memoizeAddTypes(props),
    addTypes(props),
  )
})
