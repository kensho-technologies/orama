// Copyright 2018 Kensho Technologies, LLC.

import assert from 'assert'

import {it as test} from 'mocha'

import * as methods from '../../src/CanvasInput/methods'

test('CanvasInput/methods.runHoverSolverOn 1', () => {
  assert.deepEqual(methods.runHoverSolverOn({}), {})
})

test('CanvasInput/methods.runHoverSolverOn 2', () => {
  const dataUnderMouse = {
    layerProps: {
      hoverSolver: d => d,
    },
  }
  assert.deepEqual(methods.runHoverSolverOn(dataUnderMouse), dataUnderMouse)
})

test('CanvasInput/methods.getMouseFromEvt 1', () => {
  assert.deepEqual(methods.getMouseFromEvt({}), {
    x: undefined,
    y: undefined,
  })
})
test('CanvasInput/methods.getMouseFromEvt 2', () => {
  assert.deepEqual(
    methods.getMouseFromEvt({
      touches: [{}],
    }),
    {
      x: undefined,
      y: undefined,
    }
  )
})
