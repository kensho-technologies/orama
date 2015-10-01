

import {it as test} from 'mocha'
import assert from 'assert'

import * as methods from './methods'

test('autoprefix', () => {
  assert.deepEqual(
    methods.autoprefix({flex: 1}),
    {
      WebkitFlex: 1,
      flex: 1,
    }
  )
})

test('makeStyleComponentClass', () => {
  assert.ok(
    methods.makeStyleComponentClass('Block', 'block')
  )
})
