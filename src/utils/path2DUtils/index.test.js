
import {it as test} from 'mocha'
import assert from 'assert'

import {getPath2D, pathMock} from './'

test('path', () => {
  assert.deepEqual(
    typeof getPath2D(),
    'object'
  )
})

test('pathUtils.pathMock', () => {
  assert.deepEqual(
    typeof pathMock(),
    'object'
  )
})
