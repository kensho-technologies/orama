
import {it as test} from 'mocha'
import assert from 'assert'

import React from 'react'
import shallowRender from '@luiscarli/shallow-render'

import Annotation from './'

test('Annotation', () => {
  const component = shallowRender(<Annotation/>)
  assert.deepEqual(component.type.displayName, 'Block')
})
