import * as React from 'react'

import {Chart, Points} from 'orama'

const data = [{value: 1}, {value: 2}, {value: 3}, {value: 4}, {value: 5}]

export default (
  <Chart>
    <Points
      data={data}
      x="value"
      y="value"
      radiusValue={50}
      alphaValue={0.4}
      hoverAlphaValue={1}
      hoverFillValue="crimson"
    />
  </Chart>
)
