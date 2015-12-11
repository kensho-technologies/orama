
import React, {PropTypes} from 'react'
import _ from 'lodash'
import {utcFormat} from 'd3-time-format'

import {Main, Block, Row} from 'react-display'
import {Chart} from '../Chart'
import * as plots from '../Chart/plots'

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

/**
 * Main wrapper for the application
 */
export const App = props => (
  <Main>
    <TextBody>
      <Block margin={30}>
        <Chart
          data={[props.appl, props.fb]}
          fill='Name'
          label='Name'
          pointsAlpha={0.3}
          radiusValue={4}
          size={{width: 500, height: 400}}
          tooltipExtraDimensions={['Date']}
          tooltipKeys={['x', 'y']}
          x='Open'
          y='Volume'
        />
      </Block>
      <Block margin={30}>
        <Chart
          data={[props.appl, props.fb]}
          label='Name'
          layers={[{
            data: [
              {Date: new Date(2010, 5), Close: 80},
              {Date: new Date(2010, 6), Close: 90},
              {Date: new Date(2010, 7), Close: 60},
            ],
            x: 'Date',
            y: 'Close',
            plot: plots.points,
            radiusValue: 3,
          }]}
          plot={plots.lines}
          size={{width: 500, height: 300}}
          stroke='Name'
          tooltipKeys={['x', 'y']}
          x='Date'
          xTickFormat={utcFormat('%Y')}
          y='Close'
        />
      </Block>
      <Block margin={30}>
        <Chart
          data={_.filter(props.appl, d => d.Date.getFullYear() > 2011)}
          plot={plots.areas}
          size={{width: 500, height: 300}}
          x='Date'
          xTickFormat={utcFormat('%b %y\'')}
          y='High'
          yZeroBased={true}
        />
      </Block>
      <Block margin={30}>
        <Chart
          data={[
            _.filter(props.appl, d => d.Date.getFullYear() > 2011),
            _.filter(props.fb, d => d.Date.getFullYear() > 2011),
          ]}
          fill='Name'
          plot={plots.areas}
          size={{width: 500, height: 300}}
          x='Date'
          xTickFormat={utcFormat('%b %y\'')}
          y='High'
          y0='Low'
        />
      </Block>
      <Block margin={30}>
        <Chart
          data={[
            {Name: 'APPL', value: 50},
            {Name: 'FB', value: 150},
            {Name: 'GOOGL', value: 10},
          ]}
          plot={plots.bars}
          size={{width: 500, height: 300}}
          x='Name'
          xShowGuides={false}
          y='value'
          yZeroBased={true}
        />
      </Block>
      <Block margin={30}>
        <Chart
          backgroundOffset={1}
          data={[
            {Name: 'APPL', value: 50},
            {Name: 'FB', value: 150},
            {Name: 'GOOGL', value: 10},
            {Name: 'APPL2', value: 80},
            {Name: 'FB2', value: 100},
            {Name: 'GOOGL2', value: 0},
          ]}
          plot={plots.bars}
          size={{width: 500, height: 150}}
          x='value'
          xZeroBased={true}
          y='Name'
          yShowGuides={false}
        />
      </Block>
      <Block margin={30}>
        <Chart
          backgroundOffset={1}
          data={[
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
          ]}
          plot={plots.lines}
          size={{width: 500, height: 300}}
          x='Name'
          xDomain={[0, 7]}
          xShowGuides={false}
          y='value'
          yZeroBased={true}
        />
      </Block>
      <Block margin={30}>
        <Chart
          backgroundOffset={1}
          data={[
            {Name: 1, value: 50},
            {Name: 2, value: 150},
            {Name: 3, value: 10},
            {Name: 4, value: 80},
            {Name: 5, value: 100},
            {Name: 6, value: 0},
          ]}
          plot={plots.areas}
          size={{width: 500, height: 300}}
          x='Name'
          xDomain={[0, 7]}
          xShowGuides={false}
          y='value'
          yZeroBased={true}
        />
      </Block>
      <Block margin={30}>
        <Chart
          backgroundOffset={1}
          data={[
            {Name: 'APPL', value: 50},
            {Name: 'FB', value: 150},
            {Name: 'GOOGL', value: 10},
            {Name: 'APPL2', value: 80},
            {Name: 'FB2', value: 100},
            {Name: 'GOOGL2', value: 0},
          ]}
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
          size={{width: 500, height: 300}}
          tooltipKeys={['y']}
          tooltipShowKeys={false}
          x='Name'
          xShowGuides={false}
          y='value'
          yZeroBased={true}
        />
      </Block>
    </TextBody>
  </Main>
)
App.propTypes = {
  appl: PropTypes.array,
  fb: PropTypes.array,
}
