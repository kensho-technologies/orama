
import React from 'react'

import ChartRender from '../ChartRender'
import {Flex} from '../Display'

import utils from '../../utils'

function devTest() {
  const rect = utils.path()
  rect.rect(10, 50, 400, 400)

  const elementProps = {
    size: {width: 500, height: 500},
    plotRect: {x: 50, y: 50, width: 400, height: 400},
    renderData: [
      {
        type: 'area',
        path2D: rect,
      },
    ],
  }
  return (
    <Flex flex={1}>
      <ChartRender
        {...elementProps}
      />
    </Flex>
  )
}

export default devTest
