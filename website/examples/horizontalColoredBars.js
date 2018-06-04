import * as React from 'react'

import {Chart, Bars} from 'orama'

const data = [
  {type: 'type 1', value: 10},
  {type: 'type 2', value: 20},
  {type: 'type 3', value: -7},
  {type: 'type 4', value: 3},
  {type: 'type 5', value: 12},
]

export default (
  <Chart xZeroBased>
    <Bars data={data} x="value" y="type" fill="value" />
  </Chart>
)
