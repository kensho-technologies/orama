// Copyright 2017 Kensho Technologies, LLC.

import {it as test} from 'mocha'
import assert from 'assert'

import * as React from 'react'
import shallowRender from '../../utils/shallowRender'

import {chartWidthHOC} from './'

const InputComponent = () => <div/>

test('Chart/chartWidthHOC', () => {
  const TestComp = chartWidthHOC(InputComponent)
  const component = shallowRender(
    <TestComp/>
  )
  assert.deepEqual(component.type, 'div')
})
