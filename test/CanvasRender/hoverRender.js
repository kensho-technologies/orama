// Copyright 2018 Kensho Technologies, LLC.

import assert from 'assert'

import {it as test} from 'mocha'

import pathMock from '../../src/utils/pathMock'
import ctxMock from '../../src/utils/ctxMock'
import DEFAULT_THEME from '../../src/defaultTheme'
import hoverRender from '../../src/CanvasRender/hoverRender'

const theme = DEFAULT_THEME
const plotRect = {x: 0, y: 0, width: 100, height: 100}

test('CanvasRender/hoverRender 1', () => {
  const renderData = [{path2D: pathMock}]
  const props = {renderData, plotRect, theme}
  assert.equal(hoverRender(props, ctxMock), undefined)
})

test('CanvasRender/hoverRender line', () => {
  const renderData = [{type: 'line', path2D: pathMock}]
  const props = {renderData, plotRect, theme}
  assert.equal(hoverRender(props, ctxMock), undefined)
})

test('CanvasRender/hoverRender area', () => {
  const renderData = [{type: 'area', path2D: pathMock}]
  const props = {renderData, plotRect, theme}
  assert.equal(hoverRender(props, ctxMock), undefined)
})
