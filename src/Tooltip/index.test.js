// Copyright 2018 Kensho Technologies, LLC.

import assert from 'assert'

import {it as test} from 'mocha'
import * as React from 'react'

import shallowRender from '../utils/shallowRender'

import Tooltip from '.'

test('Tooltip', () => {
  const component = shallowRender(<Tooltip hoverData={{}} layerProps={{}} />)
  assert.deepEqual(component.type.displayName, undefined)
})
