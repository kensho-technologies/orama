// Copyright 2018 Kensho Technologies, LLC.

import assert from 'assert'

import {it as test} from 'mocha'
import * as React from 'react'

import shallowRender from '../helpers/shallowRender'
import ChartBackground from '../../src/ChartBackground'

const plotRect = {x: 10, y: 10, width: 480, height: 480}

test('ChartBackground', () => {
  assert(
    shallowRender(
      <ChartBackground
        backgroundOffset={20}
        backgroundShow
        height={50}
        plotRect={plotRect}
        theme={{}}
        width={50}
        xShowLabel
        yShowLabel
      />
    )
  )
})
