
export const title = 'Scatterplot Density'
export const tags = []
export const hide = false
export const date = new Date('Tue Mar 08 2016 11:32:09 GMT-0500 (EST)')
export const description = 'Configuration changes for properly displaying data in a scatterplot according to the number of points to be mapped.'
export code from '!!raw!./'

import React from 'react'
import {Chart, Points} from '../../../'
import {State} from 'on-update'
import {randomBates} from 'd3-random'
import _ from 'lodash/fp'
import {H2} from '../../basics'
import {format} from 'd3-format'

const formatNumber = format('.2f')
const random = randomBates(10)

const generateData = (n) =>
  _.map(() => ({x: random() * 100, y: random() * 100}), _.range(0, n))

const smData = generateData(2)
const mdData = generateData(100)
const bgData = generateData(10000)


export const Component = () =>
  <div>
    <H2>2 points</H2>
    <Chart
      xNice={true}
      yNice={true}
      xTooltipFormat={formatNumber}
      yTooltipFormat={formatNumber}
    >
      <Points
        data={smData}
        x='x'
        y='y'
        radiusValue={14}
      />
    </Chart>
    <H2>100 points</H2>
    <Chart
      xTooltipFormat={formatNumber}
      yTooltipFormat={formatNumber}
    >
      <Points
        data={mdData}
        x='x'
        y='y'
      />
    </Chart>
    <H2>10000 points</H2>
    <Chart
      xTooltipFormat={formatNumber}
      yTooltipFormat={formatNumber}
    >
      <Points
        data={bgData}
        x='x'
        y='y'
        radiusValue={2}
        alphaValue={0.2}
      />
    </Chart>
  </div>

const startWith = props => {
  props.setState({})
}

export const DataVis = props =>
  <State startWith={startWith}>
    <Component {...props}/>
  </State>
