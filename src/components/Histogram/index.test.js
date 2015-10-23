
import {it as test} from 'mocha'
import assert from 'assert'

import React from 'react'
import shallowRender from '@luiscarli/shallow-render'

import Histogram from './'

test('Histogram', () => {
  const component = shallowRender(<Histogram xType='linear'/>)
  assert.deepEqual(component.type.displayName, 'Block')
})
