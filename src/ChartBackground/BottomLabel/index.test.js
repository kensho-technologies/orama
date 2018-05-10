// Copyright 2018 Kensho Technologies, LLC.

import {it as test} from 'mocha'
import assert from 'assert'

import * as React from 'react'
import shallowRender from '../../utils/shallowRender'

import {BottomLabel} from './'

test('BottomLabel', () => {
  const component = shallowRender(<BottomLabel/>)
  assert.deepEqual(component.type, 'div')
})
