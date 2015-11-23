
import {it as test} from 'mocha'
import assert from 'assert'

import * as prefixers from './prefixers'

test('prefixers.userSelect', () => {
  assert.deepEqual(
    prefixers.userSelect({userSelect: 1}),
    {
      'MozUserSelect': 1,
      'WebkitUserSelect': 1,
      'msUserSelect': 1,
      'userSelect': 1,
    }
  )
})

test('prefixers.transition', () => {
  assert.deepEqual(
    prefixers.transition({transition: 1}),
    {
      'MozTransition': 1,
      'WebkitTransition': 1,
      'msTransition': 1,
      'transition': 1,
    }
  )
})
