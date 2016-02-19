
/* eslint react/prop-types:0 */

export const title = 'Bar Charts'
export const tags = []
export const hide = false
export const date = new Date('Fri Feb 19 2016 12:57:27 GMT-0500 (EST)')
export const description = `Bars can use linear or ordinal domain (for histograms).
Linear x1/x2 dont need to keep a fixed size across bars.

On bar charts it's important for the bar start from zero, this can be done by adding 'xZeroBased' or 'yZeroBased' to the chart.`
export code from '!!raw!./'

import React from 'react'
import {Chart, Bars} from '../../../'
import {Row, Block} from 'react-display'
import {H2} from '../../basics'

const ordinalData = [
  {name: 'Facebook', value: 30},
  {name: 'Amazon', value: 72},
  {name: 'Netflix', value: 120},
  {name: 'Google', value: 87.5},
]

const linearData = [
  {binStart: 0, binEnd: 10, value: 30},
  {binStart: 10, binEnd: 20, value: 72},
  {binStart: 20, binEnd: 30, value: 120},
  {binStart: 30, binEnd: 50, value: 87.5},
]

export const Component = () =>
  <Block>
    <H2>Ordinal Bars</H2>
    <Row>
      <Block flex='1'>
        <Chart xZeroBased>
          <Bars
            data={ordinalData}
            fill='name'
            x='value'
            y='name'
          />
        </Chart>
      </Block>
      <Block flex='1'>
        <Chart yZeroBased>
          <Bars
            data={ordinalData}
            fill='name'
            x='name'
            y='value'
          />
        </Chart>
      </Block>
    </Row>
    <H2>Linear Bars</H2>
    <Row>
      <Block flex='1'>
        <Chart yZeroBased>
          <Bars
            data={linearData}
            x1='binStart' x2='binEnd'
            y='value'
          />
        </Chart>
      </Block>
      <Block flex='1'>
        <Chart xZeroBased>
          <Bars
            data={linearData}
            x='value'
            y1='binStart' y2='binEnd'
          />
        </Chart>
      </Block>
    </Row>
  </Block>

export const DataVis = props =>
  <Component {...props}/>
