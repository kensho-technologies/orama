// Copyright 2018 Kensho Technologies, LLC.

import {it as test} from 'mocha'
import assert from 'assert'

import * as React from 'react'
import shallowRender from '../utils/shallowRender'

import {Tooltip} from './'

test('Tooltip', () => {
  var component = shallowRender(
    <Tooltip
      hoverData={{}}
      layerProps={{}}
    />
  )
  assert.deepEqual(
    component.type.displayName,
    undefined
  )
})
