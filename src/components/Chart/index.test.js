
import {it as test} from 'mocha'
import assert from 'assert'

import React from 'react'
import shallowRender from '../../shallowRender'

import Chart from './'

test('Chart', () => {
  const component = shallowRender(<Chart/>)
  assert.strictEqual(component.type.displayName, 'Block')
})
