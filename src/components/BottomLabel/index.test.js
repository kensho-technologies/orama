
import {it as test} from 'mocha'
import assert from 'assert'

import React from 'react'
import shallowRender from '../../shallowRender'

import BottomLabel from './'

test('BottomLabel', () => {
  const component = shallowRender(<BottomLabel/>)
  assert.deepEqual(component.type.displayName, 'Block')
})
