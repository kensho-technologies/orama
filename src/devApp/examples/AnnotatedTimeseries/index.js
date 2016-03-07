
export const title = 'Annotated Timeseries'
export const tags = []
export const hide = false
export const date = new Date('Mon Mar 07 2016 11:28:32 GMT-0500 (EST)')
export const description = ''
export code from '!!raw!./'

import React from 'react'
import {Chart, Lines, Points, Text} from '../../../'

const selectedIdxs = [
  35, 340, 450, 860,
]
const getSelected = (data) =>
  selectedIdxs.map(idx => data[idx])

export const DataVis = props =>
  <Chart>
    <Lines
      data={props.fbData}
      x='Date'
      y='Adj. Close'
    />
    <Points
      data={getSelected(props.fbData)}
      x='Date'
      y='Adj. Close'
      radiusValue={10}
    />
    <Text
      data={getSelected(props.fbData)}
      x='Date'
      y='Adj. Close'
      textValue={(d, p, i) => i + 1}
      textAlignValue='center'
      yOffsetValue={5}
    />
  </Chart>
