import * as React from 'react'

import {Chart, Lines, Points} from 'orama'

import getRandomTimeseries from '../helpers/getRandomTimeseries' // eslint-disable-line import/order

const data = getRandomTimeseries(5000)

export default (
  <Chart>
    <Lines data={data} x="date" y="value" strokeValue="steelblue" interpolate />
    <Points data={data} x="date" y="value" fillValue="steelblue" />
  </Chart>
)
