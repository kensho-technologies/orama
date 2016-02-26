/* eslint react/prop-types:0, no-return-assign:0, no-param-reassign:0 */

export const title = 'Stacked Area Chart'
export const tags = []
export const hide = false
export const date = new Date('Fri Feb 26 2016 11:11:43 GMT-0500 (EST)')
export const description = ''
export code from '!!raw!./'

import React from 'react'
import _ from 'lodash/fp'
import {timeMonths} from 'd3-time'
import {Chart, Areas, getTimeSeries} from '../../../'

const data = _.map(
  idx => _.each(
    d => d.idx = idx,
    getTimeSeries(timeMonths(new Date(2000, 0), new Date(2020, 0))),
  ),
  _.range(0, 10),
)

_.each(
  (serie, sIdx) => {
    if (sIdx === 0) {
      _.each(d => d.y0 = 0, serie)
      return
    }
    _.each(
      (d, i) => {
        d.y0 = data[sIdx - 1][i].y
        d.y = d.y + d.y0
      },
      serie,
    )
  },
  data,
)

export const DataVis = () =>
  <Chart>
    <Areas
      data={data}
      fill='idx'
      x='x'
      y='y'
      y0='y0'
    />
  </Chart>
