// Copyright 2018 Kensho Technologies, LLC.

import assert from 'assert'

import {it as test} from 'mocha'
import * as React from 'react'

import shallowRender from '../helpers/shallowRender'
import withComputedWidth from '../../src/Chart/withComputedWidth'

test('Chart/withComputedWidth', () => {
  const BaseComponent = () => <div />
  const WithComputedWidth = withComputedWidth(BaseComponent)
  const component = shallowRender(<WithComputedWidth />)
  assert.deepEqual(component.type, 'div')
})
