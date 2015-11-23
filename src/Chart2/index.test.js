
import {it as test} from 'mocha'
import assert from 'assert'

import React from 'react'
import shallowRender from '@luiscarli/shallow-render'

import Chart2 from './'

test('Chart2', () => {
  const component = shallowRender(
    <Chart2/>
  )
  assert.deepEqual(component.type.displayName, 'Block')
})
