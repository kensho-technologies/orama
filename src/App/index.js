
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
  <Main justifyContent='center'>
    <TextBody>
      <Block margin={30}>
        <Chart
          data={[props.appl, props.fb]}
          fill='Name'
          margin={{right: 15}}
          pointsAlpha={0.3}
          radiusValue={4}
          size={{width: 500, height: 400}}
          tooltipDimensions={['Date']}
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
          margin={{right: 15}}
          plot={plots.lines}
          size={{width: 500, height: 300}}
          stroke='Name'
          x='Date'
          xTickFormat={utcFormat('%Y')}
          y='Close'
        />
      </Block>
      <Block margin={30}>
        <Chart
          data={_.filter(props.appl, d => d.Date.getFullYear() > 2011)}
          margin={{right: 15}}
          plot={plots.areas}
          size={{width: 500, height: 300}}
          x='Date'
          xTickFormat={utcFormat('%b %y\'')}
          y='High'
          alphaValue={0.85}
          yZeroBased={true}
        />
      </Block>
      <Block margin={30}>
        <Chart
          data={[
            _.filter(props.appl, d => d.Date.getFullYear() > 2011),
            _.filter(props.fb, d => d.Date.getFullYear() > 2011),
          ]}
          margin={{right: 15}}
          plot={plots.areas}
          size={{width: 500, height: 300}}
          x='Date'
          xTickFormat={utcFormat('%b %y\'')}
          y='High'
          y0='Low'
          fill='Name'
          alphaValue={0.85}
        />
      </Block>
      <Block margin={30}>
        <Chart
          data={[
            {Name: 'APPL', value: 50},
            {Name: 'FB', value: 150},
            {Name: 'GOOGL', value: 10},
          ]}
          margin={{right: 15}}
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
          margin={{right: 15}}
          plot={plots.bars}
          size={{width: 500, height: 150}}
          x='value'
          xZeroBased={true}
          y='Name'
          yShowGuides={false}
        />
      </Block>
    </TextBody>
  </Main>
)
App.propTypes = {
  appl: PropTypes.array,
  fb: PropTypes.array,
}
