import * as React from 'react'

import {Chart, Bars} from 'orama'

const data = [{type: 'a', value: 10}, {type: 'b', value: 20}, {type: 'c', value: -7}]

export default (
  <Chart yZeroBased>
    <Bars data={data} x="type" y="value" />
  </Chart>
)
