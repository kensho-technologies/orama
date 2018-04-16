// Copyright 2017 Kensho Technologies, LLC.

import {it as test} from 'mocha'
import assert from 'assert'
import {pathMock} from '../../utils/path2DUtils'
import {ctxMock} from '../../utils/canvasUtils'
import {DEFAULT_THEME} from '../../defaultTheme'

import {basicRender} from './'

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
