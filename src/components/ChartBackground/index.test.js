
import {it as test} from 'mocha'
import assert from 'assert'

import React from 'react'
import shallowRender from '../../shallowRender'

import ChartBackground from './'

test('ChartBackground', () => {
  const component = shallowRender(
    <ChartBackground
      size={{width: 0, height: 0}}
    />
  )
  assert.deepEqual(component.type, 'canvas')
})
