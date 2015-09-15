
import {it as test} from 'mocha'
import assert from 'assert'

import React from 'react'
import shallowRender from '../../shallowRender'

import Vis from './'

test('Vis', () => {
  const component = shallowRender(<Vis/>)
  assert.strictEqual(component.type.displayName, 'Flex')
})
