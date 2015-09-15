
import {it as test} from 'mocha'
import assert from 'assert'

import React from 'react'
import shallowRender from '../../shallowRender'

import If from './'

test('If', () => {
  const component = shallowRender(<If condition/>)
  assert.deepEqual(component.type, 'div')

  const component2 = shallowRender(<If condition={false}/>)
  assert.deepEqual(component2, null)
})
