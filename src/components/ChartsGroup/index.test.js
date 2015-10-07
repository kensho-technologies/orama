
import {it as test} from 'mocha'
import assert from 'assert'
import R from 'ramda'

import React from 'react'
import shallowRender from '../../shallowRender'

import ChartsGroup, {getChartElements} from './'

test('ChartsGroup', () => {
  const component = shallowRender(<ChartsGroup/>)
  assert.deepEqual(component.type.displayName, 'Flex')
})

test('getChartElements with empty props', () => {
  const elements = getChartElements({})
  assert.deepEqual(
    elements.type.displayName,
    'Chart'
  )
})

test('getChartElements with some props', () => {
  const elements = getChartElements({
    groupProp: 'test',
    data: [{test: 'a'}, {test: 'a'}, {test: 'a'}],
  })
  assert.deepEqual(
    R.isArrayLike(elements),
    true
  )
})
