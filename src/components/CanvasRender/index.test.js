
import {it as test} from 'mocha'
import assert from 'assert'

import React from 'react'
import shallowRender from '@luiscarli/shallow-render'

import {ctx} from '../../utils/canvasMock'
import {pathMock} from '../../utils/path'

import CanvasRender, {renderCanvas} from './'

test('CanvasRender', () => {
  const component = shallowRender(<CanvasRender/>)
  assert.strictEqual(component.type, 'canvas')
})

test('CanvasRender.renderCanvas()', () => {
  const renderData = [
    {
      path2D: pathMock,
    },
  ]
  const props = {
    renderData,
    plotRect: {x: 0, y: 0, width: 100, height: 100},
  }
  assert.equal(renderCanvas(props, ctx), undefined)
})
