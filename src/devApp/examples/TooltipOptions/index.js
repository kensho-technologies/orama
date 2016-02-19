
/* eslint react/prop-types:0 */

export const title = 'Tooltip Options'
export const tags = []
export const hide = false
export const date = new Date('Fri Feb 19 2016 13:55:41 GMT-0500 (EST)')
export const description = `Use 'title' for a a title accessor for the tooltip.
Use 'tooltipKeys' to limit the dimensions displayed on the tooltip
Use 'tooltipExtraDimensions' to add new dimensions on the tooltip, it can be used with Array<string> or Array<Object>.`
export code from '!!raw!./'

import React from 'react'
import {Chart, Points} from '../../../'
import {Block, Row} from 'react-display'
import {H2} from '../../basics'

const data = [
  {value: 10, value2: 10, name: 'Name 1', date: new Date(2010, 0)},
  {value: 20, value2: 20, name: 'Name 2', date: new Date(2020, 0)},
  {value: 30, value2: 30, name: 'Name 3', date: new Date(2030, 0)},
]

const options = {
  data,
  radiusValue: 15,
  y: 'value',
  x: 'value2',
}

export const DataVis = () =>
  <Row>
    <Block flex='1'>
      <Chart
        proportion={0.7}
        title='name'
        tooltipShowKeys
      >
        <Points
          {...options}
          fillValue='HSL(278, 51%, 43%)'
        />
      </Chart>
    </Block>
    <Block flex='1'>
      <Chart
        proportion={0.7}
        tooltipKeys={['x']}
        xName='New Name'
        xTooltipFormat={d => `${d}%`}
      >
        <Points
          {...options}
          fillValue='HSL(219, 79%, 58%)'
        />
      </Chart>
    </Block>
    <Block flex='1'>
      <Chart
        proportion={0.7}
        tooltipExtraDimensions={['name', 'date']}
        tooltipShowKeys
      >
        <Points
          {...options}
          fillValue='HSL(158, 100%, 45%)'
        />
      </Chart>
    </Block>
    <Block flex='1'>
      <Chart
        proportion={0.7}
        tooltipExtraDimensions={[
          {accessor: 'value', name: 'new name', format: d => `${d}%`},
        ]}
        tooltipShowKeys
      >
        <Points
          {...options}
          fillValue='HSL(88, 85%, 59%)'
        />
      </Chart>
    </Block>
  </Row>
