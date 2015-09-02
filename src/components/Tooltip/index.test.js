
import {it as test} from 'mocha'
import assert from 'assert'

import React from 'react'
import shallowRender from '../../shallowRender'

import Tooltip from './'

test('Tooltip', () => {
  const component = shallowRender(<Tooltip/>)
  assert.deepEqual(component, null)
  var component2 = shallowRender(<Tooltip hoverData={{}}/>)
  assert.deepEqual(component2.type, 'div')
})
