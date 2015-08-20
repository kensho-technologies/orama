
import test from 'tape'

import path, * as pathUtils from './path'

test('path', t => {
  t.deepEqual(
    typeof path(),
    'object'
  )
  t.end()
})

test('pathUtils.pathMock', t => {
  t.deepEqual(
    typeof pathUtils.pathMock(),
    'object'
  )
  t.end()
})
