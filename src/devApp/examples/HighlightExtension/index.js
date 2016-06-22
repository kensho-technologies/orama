
export const title = 'Highlight Extension'
export const tags = []
export const hide = false
export const date = new Date('Thu Mar 10 2016 13:37:11 GMT-0500 (EST)')
export const description = `The onUpdate prop can be used for the parent to handle the highlight data directly, instead of on the state inside the Highlight component.

When the highlight data is not handled by the component, it needs to receive it as a prop.

Slice is an optional prop that define the index in which the Highlight will be inserted on the Chart.

The Highlight component is a thin wrapper around the Chart onUpdate api, in more complex scenarios it may be better to directly handling the onUpdate from the Chart instead of through the Hightlight component.`

export code from '!!raw!./'

import React from 'react'
import {Chart, Points, Highlight} from '../../../'


export const DataVis = props =>
  <Highlight
    // onUpdate={(d)=>console.log(d)}
    // data={[]}
    // slice={1}
    Component={Points}
    componentProps={{
      x: 'Volume',
      y: 'Adj. Close',
      alphaValue: 0,
    }}
  >
    <Chart
      xType='log'
    >
      <Points
        data={props.fbData}
        x='Volume'
        y='Adj. Close'
        alphaValue={0.6}
      />
    </Chart>
  </Highlight>
