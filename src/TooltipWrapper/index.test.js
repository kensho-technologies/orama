// Copyright 2017 Kensho Technologies, LLC.

import {it as test} from 'mocha'
import assert from 'assert'

import {getTooltipPosition} from './'

test('TooltipWrapper.getTooltipPosition 1', () => {
  assert.deepEqual(
    getTooltipPosition({}),
    {}
  )
})
test('TooltipWrapper.getTooltipPosition 2', () => {
  const props = {
    width: 400, height: 400,
    mouse: {x: 0, y: 0},
  }
  const result = getTooltipPosition(props)
  assert.deepEqual(
    result,
    {left: 0, top: 0}
  )
})
test('TooltipWrapper.getTooltipPosition 3', () => {
  const props = {
    width: 400, height: 400,
    mouse: {x: 900, y: 0},
  }
  const result = getTooltipPosition(props)
  assert.deepEqual(
    result,
    {right: 100, top: 0}
  )
})
test('TooltipWrapper.getTooltipPosition 4', () => {
  const props = {
    width: 400, height: 400,
    mouse: {x: 0, y: 900},
  }
  const result = getTooltipPosition(props)
  assert.deepEqual(
    result,
    {bottom: 100, left: 0}
  )
})
