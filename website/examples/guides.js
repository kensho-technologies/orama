import * as React from 'react'

import {Chart, Guides} from 'orama'

const data = [{x: 1}, {x: 5}, {x: 8}, {x: 10}, {y: 1}, {y: 5}, {y: 8}, {y: 10}]

export default (
  <Chart yZeroBased>
    <Guides data={data} x="x" y="y" strokeValue="steelblue" lineDashValue={[5, 5]} />
  </Chart>
)
