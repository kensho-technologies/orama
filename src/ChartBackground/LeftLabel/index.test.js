// Copyright 2018 Kensho Technologies, LLC.

import assert from 'assert'

import {it as test} from 'mocha'
import * as React from 'react'

import shallowRender from '../../utils/shallowRender'

import LeftLabel from '.'

test('LeftLabel', () => {
  const component = shallowRender(<LeftLabel />)
  assert.strictEqual(component.type, 'div')
})
