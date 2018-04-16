// Copyright 2017 Kensho Technologies, LLC.

import {it as test} from 'mocha'
import assert from 'assert'
import {canvasMock, ctxMock} from '../../utils/canvasUtils'

import * as methods from './'

test('getDataUnderMouse.getDataUnderMouse', () => {
  assert.deepEqual(
    methods.getDataUnderMouse({}, {x: 100, y: 100}, canvasMock),
    {
      localMouse: {x: 100, y: 100},
    }
  )
})
test('getDataUnderMouse.findFirstPass', () => {
  assert.deepEqual(
    methods.findFirstPass(
      ctxMock,
      {x: 0, y: 0},
      [{type: 'text'}, {type: 'area'}, {type: 'line'}]
    ),
    undefined
  )
})
test('getDataUnderMouse.findSecondPass', () => {
  assert.deepEqual(
    methods.findSecondPass(
      ctxMock,
      {x: 0, y: 0},
      [{type: 'text'}, {type: 'area'}, {type: 'line'}]
    ),
    undefined
  )
})
test('getDataUnderMouse.findInRenderLayers', () => {
  assert.deepEqual(
    methods.findInRenderLayers({
      ctx: ctxMock,
      localMouse: {x: 0, y: 0},
      renderLayers: [{type: 'area', layerProps: {}}],
      findFunc: () => ({type: 'area'}),
    }),
    {
      renderDatum: {type: 'area'},
      hoverRenderData: [{type: 'area'}],
      hoverData: undefined,
      layerProps: {},
    }
  )
})
