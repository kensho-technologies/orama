
import {it as test} from 'mocha'
import assert from 'assert'

import React from 'react'
import renderComponent from '../../renderComponentTest'

import ChartInput from './'

test('ChartInput', () => {
  var component = renderComponent(<ChartInput size={{width: 0, height: 0}}/>)
  assert.strictEqual(component.type, 'div')
})
