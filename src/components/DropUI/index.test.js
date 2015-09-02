
import {it as test} from 'mocha'
import assert from 'assert'

import React from 'react'
import shallowRender from '../../shallowRender'

import DropUI from './'

test('DropUI', () => {
  const component = shallowRender(<DropUI/>)
  assert.strictEqual(component.type, 'div')
})
