
import {it as test} from 'mocha'
import assert from 'assert'

import React from 'react'
import renderComponent from '../../renderComponentTest'

import Chart from './'

test('Chart', () => {
  var component = renderComponent(<Chart/>)
  assert.strictEqual(component.type, 'div')
})
