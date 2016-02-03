
import React, {PropTypes} from 'react'
import _ from 'lodash/fp'

import {TextBody} from '../../basics/TextBody'
import {Chart, Lines, Points, Areas, Text, Bars, Ranges, Guides} from '../../../index.js'

export const Post = props =>
  <TextBody>
    <Chart // scaterplot
      yType='log'
    >
      <Points
        alphaValue={0.3}
        data={[props.applData, props.fbData]}
        fill='Name'
        radiusValue={2}
        title='Name'
        tooltipExtraDimensions={['Date']}
        tooltipKeys={['x', 'y']}
        x='Open'
        y='Volume'
      />
    </Chart>
    <Chart // multi line chart
      height={300}
    >
      <Lines
        data={[props.applData, props.fbData]}
        title='Name'
        tooltipKeys={['x', 'y']}
        x='Date'
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
      <Text
        data={[
          {
            value: 'Text Plot', Date: new Date(2004, 1),
            Close: 150,
          },
        ]}
        rotateValue={- Math.PI / 4}
        text='value'
        x='Date'
        xOffsetValue={20}
        y='Close'
        yOffsetValue={-20}
      />
    </Chart>
    <Chart // multi area chart y0
      height={300}
    >
      <Areas
        data={[
          _.filter(props.applData, d => d.Date.getFullYear() > 2011),
          _.filter(props.fbData, d => d.Date.getFullYear() > 2011),
        ]}
        fill='Name'
        stroke='Name'
        x='Date'
        y='High'
        y0='Low'
      />
    </Chart>
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
        strokeValue='black'
        x='value'
        y='Name'
      />
    </Chart>
    <Chart // small multiline
      height={300}
    >
      <Ranges
        data={[{x1: 4, x2: 5.2}, {y1: 125, y2: 100}]}
        fillValue='hsl(0, 0%, 93%)'
        showHover={false}
        tooltipExtraDimensions={['x1', 'x2', 'y1', 'y2']}
        tooltipShowKeys={false}
        x1='x1' x2='x2'
        y1='y1' y2='y2'
      />
      <Guides
        data={[{x: 3.5}, {y: 125}]}
        strokeValue='red'
        tooltipExtraDimensions={['x', 'y']}
        tooltipShowKeys={false}
        x='x' y='y'
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
        title='Name'
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
  </TextBody>

Post.propTypes = {
  applData: PropTypes.array,
  fbData: PropTypes.array,
}
