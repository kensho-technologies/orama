// Copyright 2018 Kensho Technologies, LLC.

import assert from 'assert'

import {it as test} from 'mocha'

import {getTooltipPosition} from '../../src/tooltips/TooltipWrapper'

test('TooltipWrapper.getTooltipPosition 1', () => {
  assert.deepEqual(getTooltipPosition(), {})
})

test('TooltipWrapper.getTooltipPosition 2', () => {
  const result = getTooltipPosition({x: 0, y: 0}, 400, 400)
  assert.deepEqual(result, {left: 0, top: 0})
})

test('TooltipWrapper.getTooltipPosition 3', () => {
  const result = getTooltipPosition({x: 900, y: 0}, 400, 400)
  assert.deepEqual(result, {right: 100, top: 0})
})

test('TooltipWrapper.getTooltipPosition 4', () => {
  const result = getTooltipPosition({x: 0, y: 900}, 400, 400)
  assert.deepEqual(result, {bottom: 100, left: 0})
})
