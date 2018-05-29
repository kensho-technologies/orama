// Copyright 2018 Kensho Technologies, LLC.

import assert from 'assert'

import {it as test} from 'mocha'
import * as React from 'react'

import shallowRender from '../helpers/shallowRender'
import {Chart} from '../../src/Chart'

test('Chart', () => {
  const component = shallowRender(<Chart />)
  assert.deepEqual(component.type, 'div')
})
