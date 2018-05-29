// Copyright 2018 Kensho Technologies, LLC.

import assert from 'assert'

import {it as test} from 'mocha'
import * as React from 'react'

import chartWidthHOC from '../../src/Chart/chartWidthHOC'
import shallowRender from '../helpers/shallowRender'

const InputComponent = () => <div />

test('Chart/chartWidthHOC', () => {
  const TestComp = chartWidthHOC(InputComponent)
  const component = shallowRender(<TestComp />)
  assert.deepEqual(component.type, 'div')
})
