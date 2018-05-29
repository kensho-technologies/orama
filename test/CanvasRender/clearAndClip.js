// Copyright 2018 Kensho Technologies, LLC.

import assert from 'assert'

import {it as test} from 'mocha'

import {ctxMock} from '../../src/utils/canvasUtils'
import clearAndClip from '../../src/CanvasRender/clearAndClip'

const plotRect = {x: 0, y: 0, width: 500, height: 500}

test('CanvasRender/clearAndClip 1', () => {
  assert.deepEqual(clearAndClip({}, ctxMock), undefined)
})

test('CanvasRender/clearAndClip 2', () => {
  assert.deepEqual(clearAndClip({clip: true, plotRect}, ctxMock), undefined)
})

test('CanvasRender/clearAndClip 2', () => {
  assert.deepEqual(clearAndClip({layerProps: {clipPlot: false}}, ctxMock), undefined)
})
