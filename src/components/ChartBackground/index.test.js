
import {it as test} from 'mocha'
import assert from 'assert'

import React from 'react'
import renderComponent from '../../renderComponentTest'

import ChartBackground, * as localMethods from './'

test('ChartBackground', () => {
  var component = renderComponent(
    <ChartBackground
      size={{width: 0, height: 0}}
    />
  )
  assert.deepEqual(component.type, 'canvas')
})

test('ChartBackground localMethods.getStyles', () => {
  assert(localMethods.getStyles())
})
