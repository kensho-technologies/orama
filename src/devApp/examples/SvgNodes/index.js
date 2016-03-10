
export const title = 'SVG nodes'
export const tags = []
export const hide = true
export const date = new Date('Wed Mar 09 2016 16:36:41 GMT-0500 (EST)')
export const description = ''
export code from '!!raw!./'

import React from 'react'
import {randomBates} from 'd3-random'
import _ from 'lodash/fp'

const random = randomBates(10)
const generateData = (n) =>
  _.map(() => ({x: random() * 200, y: random() * 200}), _.range(0, n))

const bgData = generateData(1000)

export const DataVis = () =>
  <svg>
    {_.map(
      d => <circle cx={d.x} cy={d.y} r='4'/>,
      bgData
    )}
  </svg>
