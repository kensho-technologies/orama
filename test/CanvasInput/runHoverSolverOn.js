// Copyright 2018 Kensho Technologies, LLC.

import assert from 'assert'

import {it as test} from 'mocha'

import runHoverSolverOn from '../../src/CanvasInput/runHoverSolverOn'

test('CanvasInput/runHoverSolverOn 1', () => {
  assert.deepEqual(runHoverSolverOn({}), {})
})

test('CanvasInput/runHoverSolverOn 2', () => {
  const dataUnderMouse = {
    layerProps: {hoverSolver: d => d},
  }
  assert.deepEqual(runHoverSolverOn(dataUnderMouse), dataUnderMouse)
})
