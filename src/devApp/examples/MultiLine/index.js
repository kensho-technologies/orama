
import React, {PropTypes} from 'react'

import {Chart, Lines} from '../../../'

export const title = 'Multi Line'
export const tags = []
export const date = new Date('Feb 3, 2016')

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

export const description = `
Data for each line is an Array of Objects, each object represents a point in the lines. Multiple lines are repesented as an Array of Arrays of Objects.`
export const imports = `import {Chart, Lines} from 'orama'`
export const code = `export const DataVis = props =>
  <Chart>
    <Lines
      data={[props.applData, props.fbData]}
      stroke='Name'
      title='Name'
      x='Date'
      y='Adj. Close'
    />
  </Chart>`
