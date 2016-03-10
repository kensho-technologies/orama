/* eslint react/prop-types:0 */

export const title = 'Brushed Timeline'
export const tags = []
export const date = new Date('Feb 4, 2016')
export const description = 'For the yDomain of the chart to match the extent of the brushed data, the data is filtered using the xDomain returned by the brush.'
export code from '!!raw!./'

import React from 'react'
import _ from 'lodash'

import {Chart, Lines, Brush} from '../../../'
import {State} from 'on-update'
import {max, min} from 'd3-array'

const LINES_OPTS = {
  title: 'Name',
  x: 'Date',
  y: 'Adj. Close',
}

const filterData = props =>
  _.filter(props.applData, d => {
    if (!props.xDomain) return true
    return d.Date > props.xDomain[0] && d.Date < props.xDomain[1]
  })

const handleUpdate = (props, childProps) => {
  props.setState({
    xDomain: childProps.xDomain,
    yDomain: childProps.yDomain,
  })
}

export const Component = props =>
  <div>
    <Chart
      proportion={0.3}
      xDomain={props.xDomain}
      xShowLabel={false}
    >
      <Lines
        {...LINES_OPTS}
        data={filterData(props)}
      />
    </Chart>
    <Brush
      onUpdate={childProps => handleUpdate(props, childProps)}
      xDomain={props.xDomain}
    >
      <Chart
        proportion={0.15}
        yName=' '
      >
        <Lines
          {...LINES_OPTS}
          data={props.applData}
          showHover={false}
        />
      </Chart>
    </Brush>
  </div>

// Here we're calculating the initial brush from the min date of the data or 2010 (which one is bigger), to the max date of the data.
const getXDomain = props => {
  if (props.applData) {
    return [
      max([new Date(2010, 0), min(props.applData, d => d.Date)]),
      max(props.applData, d => d.Date),
    ]
  }
  return undefined
}

export const DataVis = props =>
  <State>
    <Component {...props} xDomain={getXDomain(props)}/>
  </State>
