
import React, {PropTypes} from 'react'
import _ from 'lodash/fp'

import {TextBody} from '../../basics/TextBody'
import {H1, H2, Code, P} from '../../basics'
import {Chart, Lines} from '../../../'
import {timeFormat} from 'd3-time-format'

const example1 = `
const MyChart = () =>
  <Chart>
    <Lines
      data={[props.applData, props.fbData]}
      title='Name'
      stroke='Name'
      x='Date'
      y='Adj. Close'
    />
  </Chart>`

const example2 = `
const lineTransform = _.flow(
  _.groupBy(d => d.Date.getFullYear()),
  _.toPairs,
  _.map(pair =>
    _.map(d => ({
      ...d,
      Year: +pair[0],
      Day: +dayFormat(d.Date),
    }), pair[1])
  ),
)

const MyChart = () =>
  <Chart>
    <Lines
      data={lineTransform(props.applData)}
      strokeValue='lightgray'
      hoverLineWidthValue={4}
      hoverStroke='Year'
      title='Name'
      x='Day'
      y='Adj. Close'
      hoverAlphaValue={1}
    />
  </Chart>`

const dayFormat = timeFormat('%j')

const lineTransform = _.flow(
  _.groupBy(d => d.Date.getFullYear()),
  _.toPairs,
  _.map(pair =>
    _.map(d => ({
      ...d,
      Year: +pair[0],
      Day: +dayFormat(d.Date),
    }), pair[1])
  ),
)

export const Post = props =>
  <TextBody>
    <H1>Line chart examples</H1>
    <H2>Multi line chart</H2>
    <Chart>
      <Lines
        data={[props.applData, props.fbData]}
        stroke='Name'
        title='Name'
        x='Date'
        y='Adj. Close'
      />
    </Chart>
    <Code flex={1}>{example1}</Code>
    <H2>Cyclical year chart, with hoverStroke</H2>
    <Chart>
      <Lines
        data={lineTransform(props.applData)}
        hoverAlphaValue={1}
        hoverLineWidthValue={4}
        hoverStroke='Year'
        strokeValue='lightgray'
        title='Name'
        x='Day'
        y='Adj. Close'
      />
    </Chart>
    <P>Hover the Chart to see a color mapped to the hoverStroke</P>
    <Code flex={1}>{example2}</Code>
  </TextBody>

Post.propTypes = {
  applData: PropTypes.array,
  fbData: PropTypes.array,
}
