import * as React from 'react'

import {Chart, Points} from 'orama'

const data = [
  {value1: 16, value2: 10},
  {value1: 13, value2: 17},
  {value1: 15, value2: 14},
  {value1: 12, value2: 12},
  {value1: 14, value2: 10},
]

export default (
  <Chart xDomain={[11.5, 16.5]} yDomain={[9, 18]} fillRange={['whitesmoke', 'steelblue']}>
    <Points
      data={data}
      x="value1"
      y="value2"
      fill="value2"
      radiusValue={30}
      strokeValue="black"
      lineDashValue={[5, 5]}
    />
  </Chart>
)
