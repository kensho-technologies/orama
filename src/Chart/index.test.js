
import {it as test} from 'mocha'
import assert from 'assert'

import React from 'react'
import shallowRender from '@luiscarli/shallow-render'

import {StateChart} from './'

test('StateChart', () => {
  const component = shallowRender(
    <StateChart/>
  )
  assert.deepEqual(component.type.displayName, 'Block')
})
