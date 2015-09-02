
import {it as test} from 'mocha'
import assert from 'assert'

import React from 'react'
import shallowRender from '../../shallowRender'

import LeftLabel from './'

test('LeftLabel', () => {
  const component = shallowRender(<LeftLabel/>)
  assert.strictEqual(component.type, 'div')
})
