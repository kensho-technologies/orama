
import {it as test} from 'mocha'
import assert from 'assert'
import {pathMock} from '../../utils/path2DUtils'
import {ctxMock} from '../../utils/canvasUtils'

import {basicRender} from './'

test('basicRender', () => {
  const renderData = [
    {
      path2D: pathMock,
    },
  ]
  const props = {
    renderData,
    plotRect: {x: 0, y: 0, width: 100, height: 100},
  }
  assert.equal(basicRender(props, ctxMock), undefined)
})
