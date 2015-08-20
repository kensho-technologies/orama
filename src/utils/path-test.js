
import test from 'tape'

import * as path from './path'

test('path.path', t => {
  t.deepEqual(
    typeof path.path(),
    'object'
  )
  t.end()
})

test('path.pathMock', t => {
  t.deepEqual(
    typeof path.pathMock(),
    'object'
  )
  t.end()
})
