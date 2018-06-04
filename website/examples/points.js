import * as React from 'react'

import {Chart, Points} from 'orama'

const data = [
  {value1: 16, value2: 10, size: 1},
  {value1: 13, value2: 17, size: 5},
  {value1: 15, value2: 14, size: 10},
  {value1: 12, value2: 12, size: 5},
  {value1: 14, value2: 10, size: 20},
]

export default (
  <Chart>
    <Points data={data} x="value1" y="value2" radius="size" />
  </Chart>
)
