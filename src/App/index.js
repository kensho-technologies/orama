
import React, {PropTypes} from 'react'
import _ from 'lodash'
import {utcFormat} from 'd3-time-format'

import {Main, Block, Row} from 'react-display'
import {Chart} from '../Chart'
import * as plots from '../plots'

export const TextBody = props => (
  <Row
    justifyContent='center'
  >
    <Row
      flexShrink='1'
      flexWrap='wrap'
      justifyContent='center'
      margin='0 10px'
      {...props}
    >
      {props.children}
    </Row>
  </Row>
)
TextBody.propTypes = {
  children: PropTypes.node,
  onUpdate: PropTypes.func,
}
const ChartMargin = props => (
  <Block
    padding={30}
    {...props}
  />
)

/**
 * Main wrapper for the application
 */
export const App = props => (
  <Main>
    <TextBody>
      <ChartMargin>
        <Chart // scaterplot
          alphaValue={0.3}
          data={[props.appl, props.fb]}
          fill='Name'
          height={300}
          label='Name'
          radiusValue={2}
          tooltipExtraDimensions={['Date']}
          tooltipKeys={['x', 'y']}
          x='Open'
          y='Volume'
          yType='log'
        />
      </ChartMargin>
      <ChartMargin>
        <Chart // multi line chart
          data={[props.appl, props.fb]}
          height={300}
          label='Name'
          layers={[
            {
              data: [
                {Date: new Date(2010, 5), Close: 80},
                {Date: new Date(2010, 6), Close: 90},
                {Date: new Date(2010, 7), Close: 60},
              ],
              x: 'Date',
              y: 'Close',
              plot: plots.points,
              radiusValue: 3,
            },
            {
              data: [
                {
                  value: 'Text Plot', Date: new Date(2004, 1),
                  Close: 150, textAlign: 'center',
                },
              ],
              x: 'Date',
              y: 'Close',
              label: 'value',
              plot: plots.texts,
            },
          ]}
          plot={plots.lines}
          tooltipKeys={['x', 'y']}
          x='Date'
          xTickFormat={utcFormat('%Y')}
          y='Close'
        />
      </ChartMargin>
      <ChartMargin>
        <Chart // multi area chart y0
          data={[
            _.filter(props.appl, d => d.Date.getFullYear() > 2011),
            _.filter(props.fb, d => d.Date.getFullYear() > 2011),
          ]}
          fill='Name'
          height={300}
          plot={plots.areas}
          x='Date'
          xTickFormat={utcFormat('%b %y\'')}
          y='High'
          y0='Low'
        />
      </ChartMargin>
      <ChartMargin>
        <Chart // vertical bar chart
          data={[
            {Name: 'APPL', value: 50},
            {Name: 'FB', value: 150},
            {Name: 'GOOGL', value: 10},
          ]}
          height={300}
          plot={plots.bars}
          x='Name'
          xShowGuides={false}
          y='value'
          yZeroBased={true}
        />
      </ChartMargin>
      <ChartMargin>
        <Chart // horizontal bar chart
          backgroundOffset={1}
          data={[
            {Name: 'APPL', value: 50},
            {Name: 'FB', value: 150},
            {Name: 'GOOGL', value: 10},
            {Name: 'APPL2', value: 80},
            {Name: 'FB2', value: 100},
            {Name: 'GOOGL2', value: 0},
          ]}
          height={150}
          plot={plots.bars}
          x='value'
          xZeroBased={true}
          y='Name'
          yShowGuides={false}
        />
      </ChartMargin>
      <ChartMargin>
        <Chart // small multiline
          height={300}
          layers={[
            {
              data: [{x1: 4, x2: 5.2}, {y1: 125, y2: 100}],
              tooltipExtraDimensions: ['x1', 'x2', 'y1', 'y2'],
              tooltipShowKeys: false,
              fillValue: 'hsl(0, 0%, 93%)',
              plot: plots.ranges,
              showHover: false,
            },
            {
              data: [{x: 3.5}, {y: 125}],
              tooltipExtraDimensions: ['x', 'y'],
              tooltipShowKeys: false,
              strokeValue: 'red',
              plot: plots.guides,
            },
            {
              data: [
                [{Name: 1, value: 50},
                {Name: 2, value: 150},
                {Name: 3, value: 10},
                {Name: 4, value: 80},
                {Name: 5, value: 100},
                {Name: 6, value: 0}],
                [{Name: 1, value: 32},
                {Name: 2, value: 160},
                {Name: 3, value: 20},
                {Name: 4, value: 40},
                {Name: 5, value: 150},
                {Name: 6, value: 10}],
              ],
              lineDashValue: [8],
              plot: plots.lines,
              x: 'Name',
              xShowGuides: false,
              y: 'value',
              yZeroBased: true,
            },
          ]}
        />
      </ChartMargin>
      <ChartMargin>
        <Chart // vertical bar chart
          data={[
            {x1: -10, x2: -5, value: 50},
            {x1: -5, x2: 0, value: 150},
            {x1: 0, x2: 5, value: 100},
            {x1: 5, x2: 10, value: 10},
          ]}
          height={300}
          plot={plots.bars}
          x1='x1'
          x2='x2'
          xShowGuides={false}
          y='value'
          yZeroBased={true}
        />
      </ChartMargin>
      <ChartMargin>
        <Chart // small area
          data={[
            {Name: 1, value: 50},
            {Name: 2, value: 150},
            {Name: 3, value: 10},
            {Name: 4, value: 80},
            {Name: 5, value: 100},
            {Name: 6, value: 0},
          ]}
          height={300}
          plot={plots.areas}
          x='Name'
          xShowGuides={false}
          y='value'
          yZeroBased={true}
        />
      </ChartMargin>
      <ChartMargin>
        <Chart // ordinal line and bars
          backgroundOffset={1}
          data={[
            {Name: 'APPL', value: 50},
            {Name: 'FB', value: 150},
            {Name: 'GOOGL', value: 10},
            {Name: 'APPL2', value: 80},
            {Name: 'FB2', value: 100},
            {Name: 'GOOGL2', value: 0},
          ]}
          height={300}
          label='Name'
          layers={[{
            data: [
              {Name: 'APPL', value: 50},
              {Name: 'FB', value: 150},
              {Name: 'GOOGL', value: 10},
              {Name: 'APPL2', value: 80},
              {Name: 'FB2', value: 100},
              {Name: 'GOOGL2', value: 0},
            ],
            plot: plots.lines,
            x: 'Name',
            y: 'value',
            strokeValue: 'red',
          }]}
          plot={plots.bars}
          tooltipKeys={['y']}
          tooltipShowKeys={false}
          x='Name'
          xShowGuides={false}
          y='value'
          yZeroBased={true}
        />
      </ChartMargin>
    </TextBody>
  </Main>
)
App.propTypes = {
  appl: PropTypes.array,
  fb: PropTypes.array,
}
