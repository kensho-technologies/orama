// Copyright 2018 Kensho Technologies, LLC.

import assert from 'assert'

import {it as test} from 'mocha'

import canvasMock from '../helpers/canvasMock'
import ctxMock from '../helpers/ctxMock'
import getDataUnderMouse, {
  findFirstPass,
  findInRenderLayers,
  findSecondPass,
} from '../../src/CanvasInput/getDataUnderMouse'

test('getDataUnderMouse.getDataUnderMouse', () => {
  assert.deepEqual(getDataUnderMouse({}, {x: 100, y: 100}, canvasMock), {
    localMouse: {x: 100, y: 100},
  })
})

test('getDataUnderMouse.findFirstPass', () => {
  assert.deepEqual(
    findFirstPass(ctxMock, {x: 0, y: 0}, [{type: 'text'}, {type: 'area'}, {type: 'line'}]),
    undefined
  )
})

test('getDataUnderMouse.findSecondPass', () => {
  assert.deepEqual(
    findSecondPass(ctxMock, {x: 0, y: 0}, [{type: 'text'}, {type: 'area'}, {type: 'line'}]),
    undefined
  )
})

test('getDataUnderMouse.findInRenderLayers', () => {
  assert.deepEqual(
    findInRenderLayers(ctxMock, {x: 0, y: 0}, [{type: 'area', layerProps: {}}], () => ({
      type: 'area',
    })),
    {
      renderDatum: {type: 'area'},
      hoverRenderData: [{type: 'area'}],
      hoverData: undefined,
      layerProps: {},
    }
  )
})
