/* eslint react/prop-types:0 */

import {P, A} from '../../basics'

export const title = 'Line Interpolation'
export const tags = []
export const hide = false
export const date = new Date('Feb 18, 2016')
export const description = (<P>
  Uses <A href='http://scaledinnovation.com/analytics/splines/aboutSplines.html'>http://scaledinnovation.com/analytics/splines/aboutSplines.html</A>
</P>)
export code from '!!raw!./'

import React from 'react'
import {Chart, Lines, Points} from '../../../'

const data = [
  [
    {x: 53, y: 25},
    {x: 50, y: 5},
    {x: 50, y: 21},
    {x: 51, y: 15},
    {x: 45, y: 15},
  ],
  [
    {x: 0, y: 0},
    {x: 5, y: 30},
    {x: 10, y: 34},
    {x: 15, y: 40},
    {x: 20, y: 31},
    {x: 25, y: 50},
    {x: 30, y: 10},
    {x: 32, y: 15},
    {x: 35, y: 10},
    {x: 40, y: 20},
  ],
]

export const DataVis = () =>
  <Chart
    xShowGuides={false}
    yShowGuides={false}
  >
    <Lines
      data={data}
      interpolate
      x='x'
      y='y'
    />
    <Lines
      alphaValue={0.1}
      data={data}
      showHover={false}
      strokeValue='gray'
      x='x'
      y='y'
    />
    <Points
      data={data}
      x='x'
      y='y'
    />
  </Chart>
