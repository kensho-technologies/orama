/* eslint react/prop-types:0 */

export const title = 'Multi Line'
export const tags = []
export const date = new Date('Feb 3, 2016')
export const description = `Data for each line is an Array of Objects, each object represents a point in the lines. Multiple lines are repesented as an Array of Arrays of Objects.`
export code from '!!raw!./'

import React from 'react'

import {Chart, Lines} from '../../../'

export const DataVis = props =>
  <Chart>
    <Lines
      data={[props.applData, props.fbData]}
      stroke='Name'
      title='Name'
      x='Date'
      y='Adj. Close'
    />
  </Chart>
