
import {it as test} from 'mocha'
import assert from 'assert'

import React from 'react'
import shallowRender from '@luiscarli/shallow-render'

import Chart from './'

test('Chart', () => {
  const component = shallowRender(
    <Chart/>
  )
  assert.deepEqual(component.type.displayName, 'Block')
})
