// Copyright 2018 Kensho Technologies, LLC.

import assert from 'assert'

import {it as test} from 'mocha'
import * as React from 'react'

import shallowRender from '../helpers/shallowRender'
import LabelLeft from '../../src/Chart/LabelLeft'

test('LabelLeft', () => {
  const component = shallowRender(<LabelLeft plotRect={{}} theme={{}} />)
  assert.strictEqual(component.type, 'div')
})
