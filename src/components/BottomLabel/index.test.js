
import {it as test} from 'mocha'
import assert from 'assert'

import React from 'react'
import shallowRender from '../../shallowRender'

import BottomLabel, {getStyles} from './'

test('BottomLabel', () => {
  const component = shallowRender(<BottomLabel/>)
  assert.deepEqual(component.type, 'div')
})

test('BottomLabel.getStyles', () => {
  assert(getStyles())
})
