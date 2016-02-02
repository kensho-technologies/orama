
import React, {PropTypes} from 'react'
import _ from 'lodash'

import {State} from 'on-update'
import {Chart} from '../../../Chart'
import {Brush} from '../../../extensions/Brush'
import {Lines} from '../../../Layer'

const LINES_OPTS = {
  title: 'Name',
  x: 'Date',
  y: 'Adj. Close',
}

const filterData = props =>
  _.filter(props.data, d => {
    if (!props.xDomain) return true
    return d.Date > props.xDomain[0] && d.Date < props.xDomain[1]
  })

const handleUpdate = (props, childProps) => {
  props.setState({
    xDomain: childProps.xDomain,
    yDomain: childProps.yDomain,
  })
}

const InnerBrushTimeline = props =>
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
        proportion={0.2}
        yName=' '
      >
        <Lines
          {...LINES_OPTS}
          data={props.data}
          showHover={false}
        />
      </Chart>
    </Brush>
  </div>
InnerBrushTimeline.defaultProps = {
  data: [],
  xDomain: [new Date(2015, 6), new Date(2015, 10)],
}
InnerBrushTimeline.propTypes = {
  data: PropTypes.array,
  xDomain: PropTypes.array,
  yDomain: PropTypes.array,
}

export const BrushedTimeline = props =>
  <State {...props}>
    <InnerBrushTimeline/>
  </State>
