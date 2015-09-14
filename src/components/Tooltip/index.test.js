
import {it as test} from 'mocha'
import assert from 'assert'

import React from 'react'
import shallowRender from '../../shallowRender'

import Tooltip from './'

test('Tooltip', () => {
  var component = shallowRender(<Tooltip hoverData={{}}/>)
  assert.deepEqual(component.type.displayName, 'Block')
})
