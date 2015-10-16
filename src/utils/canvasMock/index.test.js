
import {it as test} from 'mocha'
import assert from 'assert'

import * as methods from './'

test('canvasMock.canvas', () => {
  assert.equal(
    methods.canvas.getContext('2d'),
    methods.ctx
  )
})
