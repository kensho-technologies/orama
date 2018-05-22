// Copyright 2018 Kensho Technologies, LLC.

import assert from 'assert'

import {it as test} from 'mocha'

import {ctxMock} from '../../utils/canvasUtils'

import * as methods from '.'

const plotRect = {x: 0, y: 0, width: 500, height: 500}

test('CanvasRender/clearAndClip 1', () => {
  assert.deepEqual(methods.clearAndClip({}, ctxMock), undefined)
})
test('CanvasRender/clearAndClip 2', () => {
  assert.deepEqual(
    methods.clearAndClip(
      {
        clip: true,
        plotRect,
      },
      ctxMock
    ),
    undefined
  )
})
test('CanvasRender/clearAndClip 2', () => {
  assert.deepEqual(
    methods.clearAndClip(
      {
        layerProps: {clipPlot: false},
      },
      ctxMock
    ),
    undefined
  )
})
