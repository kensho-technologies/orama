
import React, {PropTypes} from 'react'
import _ from 'lodash'
import {utcFormat} from 'd3-time-format'

import {Main, Block, Row} from 'react-display'
import {Areas} from '../Layer'
import {Bars} from '../Layer'
import {Chart} from '../Chart'
import {Guides} from '../Layer'
import {Lines} from '../Layer'
import {Points} from '../Layer'
import {Ranges} from '../Layer'
import {Texts} from '../Layer'

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
    flex='1 1 40%'
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
          height={300}
          yType='log'
        >
          <Points
            alphaValue={0.3}
            data={[props.appl, props.fb]}
            fill='Name'
            label='Name'
            radiusValue={2}
            tooltipExtraDimensions={['Date']}
            tooltipKeys={['x', 'y']}
            x='Open'
            y='Volume'
          />
        </Chart>
      </ChartMargin>
      <ChartMargin>
        <Chart // multi line chart
          height={300}
        >
          <Lines
            data={[props.appl, props.fb]}
            label='Name'
            tooltipKeys={['x', 'y']}
            x='Date'
            xTickFormat={utcFormat('%Y')}
            y='Close'
          />
          <Points
            data={[
              {Date: new Date(2010, 5), Close: 80},
              {Date: new Date(2010, 6), Close: 90},
              {Date: new Date(2010, 7), Close: 60},
            ]}
            radiusValue={3}
            skipExtractArrays={true}
            x='Date'
            y='Close'
          />
          <Texts
            data={[
              {
                value: 'Text Plot', Date: new Date(2004, 1),
                Close: 150, textAlign: 'center',
              },
            ]}
            label='value'
            x='Date'
            y='Close'
          />
        </Chart>
      </ChartMargin>
      <ChartMargin>
        <Chart // multi area chart y0
          height={300}
        >
          <Areas
            data={[
              _.filter(props.appl, d => d.Date.getFullYear() > 2011),
              _.filter(props.fb, d => d.Date.getFullYear() > 2011),
            ]}
            fill='Name'
            x='Date'
            xTickFormat={utcFormat('%b %y\'')}
            y='High'
            y0='Low'
          />
        </Chart>
      </ChartMargin>
      <ChartMargin>
        <Chart // vertical bar chart
          height={300}
          xShowGuides={false}
          yZeroBased={true}
        >
          <Bars
            data={[
              {Name: 'APPL', value: 50},
              {Name: 'FB', value: 150},
              {Name: 'GOOGL', value: 10},
            ]}
            tooltipExtraDimensions={[
              {name: '...Test', value: '40%'},
            ]}
            x='Name'
            y='value'
          />
        </Chart>
      </ChartMargin>
      <ChartMargin>
        <Chart // horizontal bar chart
          backgroundOffset={1}
          height={150}
          xZeroBased={true}
          yShowGuides={false}
        >
          <Bars
            data={[
              {Name: 'APPL', value: 50},
              {Name: 'FB', value: 150},
              {Name: 'GOOGL', value: 10},
              {Name: 'APPL2', value: 80},
              {Name: 'FB2', value: 100},
              {Name: 'GOOGL2', value: 0},
            ]}
            x='value'
            y='Name'
          />
        </Chart>
      </ChartMargin>
      <ChartMargin>
        <Chart // small multiline
          height={300}
        >
          <Ranges
            data={[{x1: 4, x2: 5.2}, {y1: 125, y2: 100}]}
            fillValue='hsl(0, 0%, 93%)'
            showHover={false}
            tooltipExtraDimensions={['x1', 'x2', 'y1', 'y2']}
            tooltipShowKeys={false}
          />
          <Guides
            data={[{x: 3.5}, {y: 125}]}
            strokeValue='red'
            tooltipExtraDimensions={['x', 'y']}
            tooltipShowKeys={false}
          />
          <Lines
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
            lineDashValue={[8]}
            x='Name'
            xShowGuides={false}
            y='value'
            yZeroBased={true}
          />
        </Chart>
      </ChartMargin>
      <ChartMargin>
        <Chart // vertical bar chart
          height={300}
          xShowGuides={false}
          yZeroBased={true}
        >
          <Bars
            data={[
              {x1: -10, x2: -5, value: 50},
              {x1: -5, x2: 0, value: 150},
              {x1: 0, x2: 5, value: 100},
              {x1: 5, x2: 10, value: 10},
            ]}
            x1='x1'
            x2='x2'
            y='value'
          />
        </Chart>
      </ChartMargin>
      <ChartMargin>
        <Chart // small area
          height={300}
          xShowGuides={false}
          yZeroBased={true}
        >
          <Areas
            data={[
              {Name: 1, value: 50},
              {Name: 2, value: 150},
              {Name: 3, value: 10},
              {Name: 4, value: 80},
              {Name: 5, value: 100},
              {Name: 6, value: 0},
            ]}
            x='Name'
            y='value'
          />
        </Chart>
      </ChartMargin>
      <ChartMargin>
        <Chart // ordinal line and bars
          backgroundOffset={1}
          height={300}
          xShowGuides={false}
          yZeroBased={true}
        >
          <Bars
            data={[
              {Name: 'APPL', value: 50},
              {Name: 'FB', value: 150},
              {Name: 'GOOGL', value: 10},
              {Name: 'APPL2', value: 80},
              {Name: 'FB2', value: 100},
              {Name: 'GOOGL2', value: 0},
            ]}
            label='Name'
            tooltipKeys={['y']}
            tooltipShowKeys={false}
            x='Name'
            y='value'
          />
          <Lines
            data={[
              {Name: 'APPL', value: 50},
              {Name: 'FB', value: 150},
              {Name: 'GOOGL', value: 10},
              {Name: 'APPL2', value: 80},
              {Name: 'FB2', value: 100},
              {Name: 'GOOGL2', value: 0},
            ]}
            strokeValue='red'
            x='Name'
            y='value'
          />
        </Chart>
      </ChartMargin>
    </TextBody>
  </Main>
)
App.propTypes = {
  appl: PropTypes.array,
  fb: PropTypes.array,
}
