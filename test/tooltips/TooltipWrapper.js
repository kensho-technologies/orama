// Copyright 2018 Kensho Technologies, LLC.

import assert from 'assert'

import {it as test} from 'mocha'

import {getTooltipTransform} from '../../src/tooltips/TooltipWrapper'

test('TooltipWrapper.getTooltipTransform 1', () => {
  assert.deepEqual(getTooltipTransform(), {})
})

test('TooltipWrapper.getTooltipTransform 2', () => {
  const result = getTooltipTransform({x: 0, y: 0}, 400, 400)
  assert.deepEqual(result, 'translate(15px, 15px)')
})

test('TooltipWrapper.getTooltipTransform 3', () => {
  const result = getTooltipTransform({x: 900, y: 0}, 400, 400)
  assert.deepEqual(result, 'translate(485px, 15px)')
})

test('TooltipWrapper.getTooltipTransform 4', () => {
  const result = getTooltipTransform({x: 0, y: 900}, 400, 400)
  assert.deepEqual(result, 'translate(15px, 485px)')
})
