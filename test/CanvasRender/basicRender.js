// Copyright 2018 Kensho Technologies, LLC.

import assert from 'assert'

import {it as test} from 'mocha'

import pathMock from '../../src/utils/pathMock'
import ctxMock from '../../src/utils/ctxMock'
import DEFAULT_THEME from '../../src/defaultTheme'
import basicRender from '../../src/CanvasRender/basicRender'

const theme = DEFAULT_THEME
const plotRect = {x: 0, y: 0, width: 100, height: 100}

test('CanvasRender/basicRender 1', () => {
  const renderData = [{path2D: pathMock}]
  const props = {renderData, plotRect, theme}
  assert.equal(basicRender(props, ctxMock), undefined)
})

test('CanvasRender/basicRender line', () => {
  const renderData = [{type: 'line', path2D: pathMock}]
  const props = {renderData, plotRect, theme}
  assert.equal(basicRender(props, ctxMock), undefined)
})

test('CanvasRender/basicRender lineDash', () => {
  const renderData = [{type: 'line', lineDash: [5], path2D: pathMock}]
  const props = {renderData, plotRect, theme}
  assert.equal(basicRender(props, ctxMock), undefined)
})

test('CanvasRender/basicRender area', () => {
  const renderData = [{type: 'area', path2D: pathMock}]
  const props = {renderData, plotRect, theme}
  assert.equal(basicRender(props, ctxMock), undefined)
})

test('CanvasRender/basicRender text', () => {
  const renderData = [{type: 'text', path2D: pathMock}]
  const props = {renderData, plotRect, theme}
  assert.equal(basicRender(props, ctxMock), undefined)
})
