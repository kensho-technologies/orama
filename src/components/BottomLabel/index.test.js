
import {it as test} from 'mocha'
import assert from 'assert'

import React from 'react'
import renderComponent from '../../renderComponentTest'

import BottomLabel, {getStyles} from './'

test('BottomLabel', () => {
  var component = renderComponent(<BottomLabel/>)
  assert.deepEqual(component.type, 'div')
})

test('BottomLabel.getStyles', () => {
  assert(getStyles())
})
