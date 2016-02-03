import React, {PropTypes} from 'react'

import _ from 'lodash/fp'
import {Chart, Lines} from '../../../'
import {timeFormat} from 'd3-time-format'

export const title = 'Hover Stroke'
export const tags = []
export const date = new Date('Feb 3, 2016')

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

export const DataVis = props =>
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

export const description = ``
export const imports = `import _ from 'lodash/fp'
import {Chart, Lines} from 'orama'
import {timeFormat} from 'd3-time-format'`
export const code = `const dayFormat = timeFormat('%j')
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

export const DataVis = props =>
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
  </Chart>`
