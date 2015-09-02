
import {it as test} from 'mocha'
import assert from 'assert'

import path, * as pathUtils from './'

test('path', () => {
  assert.deepEqual(
    typeof path(),
    'object'
  )
})

test('pathUtils.pathMock', () => {
  assert.deepEqual(
    typeof pathUtils.pathMock(),
    'object'
  )
})
