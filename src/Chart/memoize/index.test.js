
import {it as test} from 'mocha'
import assert from 'assert'
import {addTypes} from '../../Chart/addMethods'

import * as methods from './'

test('memoize.getMemoizeAddType', () => {
  const memoizeAddType = methods.getMemoizeAddType()
  const props = {
    groupedKeys: ['x'],
    xArray: [1, 2, 3],
  }
  const memoizedProps = memoizeAddType(props)
  assert.equal(
    memoizeAddType(props),
    memoizedProps,
  )
  assert.notEqual(
    memoizeAddType(props),
    addTypes(props),
  )
})
