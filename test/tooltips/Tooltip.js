// Copyright 2018 Kensho Technologies, LLC.

import assert from 'assert'

import {it as test} from 'mocha'
import * as React from 'react'

import Tooltip from '../../src/tooltips/Tooltip'
import shallowRender from '../helpers/shallowRender'

test('Tooltip', () => {
  const component = shallowRender(<Tooltip hoverData={{}} layerProps={{}} theme={{}} />)
  assert.deepEqual(component.type.displayName, undefined)
})
